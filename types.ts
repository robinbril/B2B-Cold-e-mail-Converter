export interface CompanyData {
  name: string;
  description: string;
  contactPerson: string;
}

export interface PromptOption {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
}

export interface GeneratedEmail {
  subject: string;
  body: string;
}
