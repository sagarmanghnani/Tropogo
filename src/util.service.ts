export class UtilService {
    public static generateRandomNumber(max){
        return Math.floor(Math.random() * Math.floor(max))
    }
}