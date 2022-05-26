type MailDataType = {
    to:string;
    subject:string;
    text?:string;
    files?:string[];
    html?:string;
}

export default MailDataType;