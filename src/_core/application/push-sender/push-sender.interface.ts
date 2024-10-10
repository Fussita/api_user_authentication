import { Result } from "src/_core";
import { PushNotificationDto } from "./dto/push-notification.dto";

export interface IPushSender {
    sendNotificationByToken ( pushDto: PushNotificationDto ): Promise<Result<string>> 
}
 