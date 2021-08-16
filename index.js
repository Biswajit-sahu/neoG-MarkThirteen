var inputEl = document.querySelector("#input-element");

function reverseStr(str) {

    var charList = str.split("");
    charList.reverse();
    var reversedStr = charList.join('');
    return reversedStr;
}
var date = {
    day: "",
    month: "",
    year: "",
}

function dateToString(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };


    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;

}

function dateformatsArr(inputDate) {
    var dateStr = dateToString(inputDate);
    var ddmmyyyy;
    var mmddyyyy;
    var yyyymmdd;
    var ddmmyy;
    var mmddyy;
    var yymmdd;

    ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    ddmmyy = ddmmyyyy.slice(0, 4) + ddmmyyyy.slice(-2);
    mmddyy = mmddyyyy.slice(0, 4) + mmddyyyy.slice(-2);
    yymmdd = yyyymmdd.slice(2);
    var dateArr = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
    return dateArr;

}

function checkPalindromeAllFormats(input) {
    var arr = dateformatsArr(input);

    var isPalindrome = false;
    for (let index = 0; index < arr.length; index++) {
        if (arr[index] == reverseStr(arr[index])) {
            isPalindrome = true;
            break;
        }
    }
    return isPalindrome;
}

function checkLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 == 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;

}

function nextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 30];
    if (month === 2) {
        if (checkLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = month + 1;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day,
        month,
        year
    }
}

function findNextPalindrome(date) {
    var nextCount = 0;
   
    var nextdate = nextDate(date);
    while (1) {
        nextCount++;
        if (checkPalindromeAllFormats(nextdate)) {
            break;
        }
        nextdate = nextDate(nextdate);

    }
    return [nextCount, nextdate];
}

function clickHandler() {
    var inputDate = inputEl.value;

    if(inputDate !== ''){
    var inputArr = inputDate.split("-");
    var date = {
        day: Number(inputArr[2]),
        month: Number(inputArr[1]),
        year: Number(inputArr[0])
    }
    var isPalindrome = checkPalindromeAllFormats(date);
    
    if (isPalindrome) {
        message.innerText = "Yay, Your Date of birth is a palindrome😀";
    } else {
        var nextDate = findNextPalindrome(date);
        var nextDateFinal = nextDate[1].day + '/' + nextDate[1].month + '/' + nextDate[1].year;
        message.innerText = `
        😢  You have missed the next palindrome date by ${nextDate[0]} days which is on ${nextDateFinal}`;
    }


}
}
var checkButton = document.querySelector("#check-btn");
var inpuEl = document.querySelector("#input-element");
var message = document.querySelector("#message");
checkButton.addEventListener("click", clickHandler);
    