(function () {
    var passwd, classTypes, classCount, len, chars, classIndex, charIndex;
    do {
        passwd = "";
        classTypes = [];
        classCount = 0;
        len = Math.round(Math.random() * 5 + 8);
        chars = ["~!@#$%^&*()_+=-|\\}]{[\"':;?/>.<,", "0123456789",
                 "abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
        while (passwd.length < len) {
            classIndex = Math.round(Math.random() * 3);
            classTypes[classIndex] = true;
            charIndex = Math.round(Math.random() * (chars[classIndex].length - 1));
            passwd += chars[classIndex].charAt(charIndex);
        }
        console.log(JSON.stringify(classTypes));
        classCount = classTypes.filter(function (value, index, object) {
            return value === true; }).length;
        console.log("classCount = " + classCount);
        console.log("passwd.length = " + passwd.length);
    } while (classCount < 4);
    console.log("generated pasword is \n"+passwd);
    console.log("but see http://xkcd.com/936/ for better paswords");
})();

