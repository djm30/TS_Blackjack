import { resolve } from "path"

export let wait = async (duration: number): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), duration)
    })
} 