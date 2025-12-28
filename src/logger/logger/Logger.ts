import { createLogger, format, transports } from 'winston'
import * as path from 'path'

const logDir = path.join(process.cwd(), 'logs')

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.printf(({ timestamp, level, message, stack }) => {
            return stack
                ? `${timestamp} [${level.toUpperCase()}]: ${stack}`
                : `${timestamp} [${level.toUpperCase()}]: ${message}`
        })
    ),
    transports: [
        new transports.Console(),

        new transports.File({
            filename: path.join(logDir, 'app.log'),
        }),

        new transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error',
        })
    ]
})

export default class Log {

    static info(message: string): void {
        logger.info(message)
    }

    static warn(message: string): void {
        logger.warn(message)
    }

    static error(message: string, error?: unknown): void {
        if (error instanceof Error) {
            logger.error(message, error)
        } else {
            logger.error(message)
        }
    }

    static logError(
        className: string,
        methodName: string,
        exception: unknown
    ): void {
        logger.error(`ClassName: ${className}`)
        logger.error(`MethodName: ${methodName}`)
        logger.error(`Exception: ${exception instanceof Error ? exception.stack : exception}`)
        logger.error('------------------------------------------------------------')
    }
}
