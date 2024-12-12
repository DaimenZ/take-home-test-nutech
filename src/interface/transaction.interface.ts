export interface TopupDTO {
  top_up_amount: number;
}

export interface Transaction {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}

export interface TransactionHistory {
  offset: number;
  limit?: number;
  records: Transaction[];
}

export interface Payment {
  invoice_number: string;
  service_code: string;
  service_name: string;
  transaction_type: string;
  total_amount: number;
  created_on: string;
}
