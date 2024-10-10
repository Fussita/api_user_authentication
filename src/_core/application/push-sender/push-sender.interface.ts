import { Result } from "../../utils/result-handler/Result";
import { PushNotificationDto } from "./dto/push-notification.dto";

export interface IPushSender {
    sendNotificationByToken ( pushDto: PushNotificationDto ): Promise<Result<string>> 
}
