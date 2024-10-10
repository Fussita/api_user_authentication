import { IDateHandler } from "src/_core/application/date-handler/date-handler.interface";
var moment = require('moment')

export class MomentDateHandler implements IDateHandler {

    currentDate(): Date {
        return new Date()
    }

    getExpiry() {
        const expiresAt = moment().add(7, "days").toDate()
        return expiresAt
    }

    isExpired( expiry: Date ) {
        const expirationDate = new Date(expiry)
        const currentDate = new Date()
        return expirationDate.getTime() <= currentDate.getTime()
    }
}