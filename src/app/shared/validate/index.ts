/**
 * 校验器
 * @author Sawyer
 */
export class ValidateUtil {

    public static mobilePattern = /^[1][3456789][0-9]{9}$/;
    public static emailPattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    public static idCardPattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    public static bankAccountPattern = /^([1-9]{1})(\d{14}|\d{18}|\d{15})$/;
    public static taxPayerPattern = /^([1-9]{1})(\d{14}|\d{18}|\d{15})$/;
    public static blankPattern = /^\s+$/gi;
    public static zipCodePattern = /^[1-9][0-9]{5}$/;
    public static telephonePattern = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    public static urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
    public static specialCharacterPattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im;
    // var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
    // regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

    /**
     * 判断手机号是否合法
     * @param mobile 手机号
     */
    static isMobile(mobile: string): boolean {
        return this.mobilePattern.test(mobile);
    }

    /**
     * 判断邮箱是否合法
     * @param email 邮箱
     */
    static isEmail(email: string): boolean {
        return this.emailPattern.test(email);
    }

    /**
     * 判断 input 中是否包含特殊字符
     * @param input 输入字符
     */
    static containSpecialCharacter(input: string): boolean {
        return this.specialCharacterPattern.test(input);
    }
}
