import { createClient, RedisClientType } from 'redis'

export class RedisConnection {

    private PORT = 6379
    private HOST = '192.168.176.2'
    private client!: RedisClientType
    private isConnected: boolean = false
    private DEFAULT_EXPIRATION_SECONDS = 60

    constructor () {
        this.client = createClient({ url: `redis://${this.HOST}:${this.PORT}`})
    }

    private async connect(): Promise<void> {
        this.client.on('error', (err) => {
            console.error('redis connection failed. error:', err)
        })

        this.client.on('connect', () => {
            console.log('>> redis connection done with success <<')
            this.isConnected = true       
        })

        await this.client.connect()
    }

    async setCache(key: string, value: any, expiration = this.DEFAULT_EXPIRATION_SECONDS): Promise<void> {
        if (!this.isConnected) this.connect()
        await this.client.set(key, JSON.stringify(value), { EX: expiration})
    }

    async getCache<T> (key: string): Promise<T | null> {
        if (!this.isConnected) this.connect()
        const cachedValue = await this.client.get(key);
        if (!cachedValue) return null;
        return JSON.parse(cachedValue) as T;
    }

    async evictCache(key: string): Promise<void> {
        if (!this.isConnected) this.connect()
        await this.client.del(key);
    }

}