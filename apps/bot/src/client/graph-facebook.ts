import {
  GRAPH_API_TOKEN,
  URL_GRAPH_FACEBOOK,
  WHATSAPP_RECIPIENT_PHONE,
} from '../config/environment.ts';
import { ApiClient } from '../utils/api-client.ts';

const whatsAppApi = new ApiClient(URL_GRAPH_FACEBOOK, GRAPH_API_TOKEN);

class GraphFacebookApi {
  private readonly client!: ApiClient;
  constructor(client: ApiClient) {
    this.client = client;
  }

  async sendMessage(message: string) {
    await this.client.post('/messages', {
      recipient_type: 'individual',
      messaging_product: 'whatsapp',
      to: WHATSAPP_RECIPIENT_PHONE,
      type: 'text',
      text: {
        body: message,
      },
    });
  }
}

export const graphFacebookApi = new GraphFacebookApi(whatsAppApi);
