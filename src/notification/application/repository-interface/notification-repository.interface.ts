import { Result } from "src/_core/utils/result-handler/Result"
import { NotificationModel } from "../entity-model/notification-model.interface"

export interface INotificationRepository {
  saveNotification(entry: NotificationModel): Promise<Result<NotificationModel>>
  updateNotification(entry: NotificationModel): Promise<Result<NotificationModel>>
  findNotReadedNotificationsByUserId(id: string): Promise<Result<NotificationModel[]>> 
}
