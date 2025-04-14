import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { AI_MODELS } from '../../components/ModelSelector';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || ''
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

// Default model to use if none is specified
const DEFAULT_MODEL = AI_MODELS[0].id;

export const runtime = 'edge';

export async function POST(req: Request) {
  const { product, audience, goal, platform, model } = await req.json();

  // Validate required fields
  if (!product || !audience) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { 
      status: 400, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  // Determine which model to use, fall back to default if the specified model doesn't exist
  const modelInfo = AI_MODELS.find(m => m.id === model);
  const modelToUse = modelInfo ? model : DEFAULT_MODEL;
  const provider = modelInfo?.provider || 'anthropic';
  
  // Prepare prompt based on inputs
  let systemPrompt = `You are an expert social media marketer specialized in creating engaging ${platform !== 'all' ? platform : ''} content. 
Create compelling content ideas for a product: "${product}" targeting "${audience}".`;

  if (goal) {
    systemPrompt += ` The main goal of this content is to drive ${goal}.`;
  }

  systemPrompt += `
For each idea, provide the following:
1. A catchy title for the content idea
2. A hook that will grab attention in the first 3-5 seconds
3. A video outline describing what should be filmed or created
4. A caption including relevant hashtags

Return your response in JSON format with the following structure:
{
  "ideas": [
    {
      "id": "1",
      "title": "Title of the content idea",
      "hook": "The hook that grabs attention",
      "videoOutline": "Description of what to film or create",
      "caption": "The post caption with hashtags"
    },
    ...more ideas
  ]
}
`;

  try {
    let responseJson;

    // Use the appropriate provider based on the selected model
    if (provider === 'anthropic') {
      // Create a completion with the selected Anthropic Claude model
      const response = await anthropic.messages.create({
        model: modelToUse,
        max_tokens: 1500,
        temperature: 0.7,
        system: systemPrompt,
        messages: [
          { 
            role: 'user', 
            content: `Create content ideas for ${platform !== 'all' ? platform : 'social media'} promoting "${product}" to "${audience}"${goal ? ` with the goal of ${goal}` : ''}.` 
          }
        ],
      });

      // Claude doesn't have a built-in JSON mode, so we parse the text response
      try {
        // Get the text content from the response
        let responseText = '';
        
        // Extract text content from the response
        if (response.content && response.content.length > 0) {
          const contentBlock = response.content[0];
          if ('text' in contentBlock) {
            responseText = contentBlock.text;
          }
        }
        
        if (!responseText) {
          throw new Error('No text content in the response');
        }
        
        // Try to extract JSON from the response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
          const jsonString = jsonMatch[0];
          responseJson = JSON.parse(jsonString);
        } else {
          throw new Error('Failed to parse JSON from response');
        }
      } catch (parseError) {
        console.error('Error parsing JSON from Claude response:', parseError);
        throw new Error('Failed to parse response from AI');
      }
    } else if (provider === 'openai') {
      // Create a completion with the selected OpenAI model
      const response = await openai.chat.completions.create({
        model: modelToUse,
        temperature: 0.7,
        max_tokens: 1500,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Create content ideas for ${platform !== 'all' ? platform : 'social media'} promoting "${product}" to "${audience}"${goal ? ` with the goal of ${goal}` : ''}.`
          }
        ],
      });

      // Parse the JSON response
      if (response.choices && response.choices[0]?.message?.content) {
        responseJson = JSON.parse(response.choices[0].message.content);
      } else {
        throw new Error('No content in OpenAI response');
      }
    } else {
      throw new Error('Unsupported AI provider');
    }

    // Return the JSON response
    return new Response(JSON.stringify(responseJson), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error calling AI API:', error);
    
    // Fallback response
    return new Response(JSON.stringify({ 
      ideas: [
        {
          id: '1',
          title: 'Content Idea',
          hook: 'Attention-grabbing hook',
          videoOutline: 'Video outline for your product',
          caption: `Check out this amazing ${product}! #trending`
        }
      ],
      error: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
} 