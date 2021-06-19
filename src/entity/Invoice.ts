export interface Invoice{
    invoiceId: string,
    invoiceType: string,
    invoiceDate: Date,
    productsTotal: number,
    moneyTotal: number,
    productInvoices: []
}