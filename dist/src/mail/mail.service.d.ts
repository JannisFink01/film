export interface SendMailParams {
    subject: string;
    body: string;
}
export declare class MailService {
    #private;
    sendmail({ subject, body }: SendMailParams): Promise<void>;
}
