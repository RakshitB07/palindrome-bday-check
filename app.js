const inputDate = document.querySelector("#input-date");
const checkBtn = document.querySelector("#check-btn");
const outputEl = document.querySelector("#next-output");
const outputEl2 = document.querySelector("#previous-output");

function reverseStr(string) {
    const strReversed = string.split("").reverse().join("");

    return strReversed;
}

function isPalindrome(string) {
    const strReversed = reverseStr(string);

    return string === strReversed;
}

function convertDateToString(date) {
    let dateToStr = {
        day: "",
        month: "",
        year: ""
    };

    if (date.day < 10) {
        dateToStr.day = "0" + date.day;
    } else {
        dateToStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateToStr.month = "0" + date.month;
    } else {
        dateToStr.month = date.month.toString();
    }

    dateToStr.year = date.year.toString();

    return dateToStr;
}

function createDateFormats(date) {
    let dateObjStr = convertDateToString(date);
    let ddmmyyyy = dateObjStr.day + dateObjStr.month + dateObjStr.year;
    let mmddyyyy = dateObjStr.month + dateObjStr.day + dateObjStr.year;
    let yyyymmdd = dateObjStr.year + dateObjStr.month + dateObjStr.day;
    let ddmmyy = dateObjStr.day + dateObjStr.month + dateObjStr.year.slice(-2);
    let mmddyy = dateObjStr.month + dateObjStr.day + dateObjStr.year.slice(-2);
    let yymmdd = dateObjStr.year.slice(-2) + dateObjStr.month + dateObjStr.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindrome(date) {
    let dateFormatList = createDateFormats(date);
    let flag = false;
    for (let str of dateFormatList) {
        if (isPalindrome(str)) {
            return (flag = true);
        }
    }
    return flag;
}

function leapYear(year) {
    if (year % 400 === 0) {
        return true;
    }

    if (year % 100 === 0) {
        return false;
    }

    if (year % 4 === 0) {
        return true;
    }

    return false;
}

function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;
    let daysInMonth = [31, 28, 30, 31, 30, 31, 30, 31, 30, 31, 30, 31];
    if (leapYear(year)) {
        if (month === 2) {
            daysInMonth[1] = 29;
            if (day > daysInMonth[month - 1]) {
                day = 1;
                month++;
            }
        }
    }

    if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}

function getPreviousDate(date) {
    let daysInMonth = [31, 28, 30, 31, 30, 31, 30, 31, 30, 31, 30, 31];

    var day = date.day - 1;
    let month = date.month;
    let year = date.year;

    if (leapYear(year)) {
        daysInMonth[1] = 29;
        if (day === 0) {
            month--;
            if (month === 0) {
                month = 12;
                year--;
                day = daysInMonth[month - 1] - day;
            } else {
                day = daysInMonth[month - 1] - day;
            }
        }
    }

    if (day === 0) {
        month--;
        if (month === 0) {
            month = 12;
            year--;
            day = daysInMonth[month - 1] - day;
        } else {
            day = daysInMonth[month - 1] - day;
        }
    }

    return {
        day: day,
        month: month,
        year: year,
    };
}

function nextPalindromeDate(date) {
    let counter = 0;
    let nextDate = getNextDate(date);

    while (1) {
        counter++;
        let isPalindrome = checkPalindrome(nextDate);
        if (isPalindrome) {
            break;
        }

        nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate];
}

function previousPalindromeDate(date) {
    counter = 0;
    let prevDate = getPreviousDate(date);

    while (1) {
        counter++;
        let isPalindrome = checkPalindrome(prevDate);
        if (isPalindrome) {
            break;
        }
        prevDate = getPreviousDate(prevDate);
    }

    return [counter, prevDate];
}

function clickHandler() {
    const date = inputDate.value;

    if (date === "") {
        outputEl.innerHTML = `<p id="invalid">Invalid-input: Please enter date</p>`;
    } else {
        const dateArray = date.split("-");

        const dateObject = {
            day: Number(dateArray[2]),
            month: Number(dateArray[1]),
            year: Number(dateArray[0]),
        };

        outputEl.style.display = "block";
        outputEl2.style.display = "block";

        const isPalindrome = checkPalindrome(dateObject);

        setTimeout(() => {
            if (isPalindrome) {
                outputEl.innerHTML = `<p>Your birthday is <span>Palindrome</span></p>`;
            } else {

                const [counterNext, nextDate] = nextPalindromeDate(dateObject);
                outputEl.innerHTML = `<p>The next palindrome date is <span>${
          nextDate.day
        }-${nextDate.month}-${
          nextDate.year
        }</span> , which is after <span>${counterNext}</span> ${
          counterNext > 1 ? "days" : "day"
        }.</p>`;

                const [counterPrev, datePrev] = previousPalindromeDate(dateObject);
                outputEl2.innerHTML = `<p>The previous palindrome date is  <span>${
          datePrev.day
        }-${datePrev.month}-${
          datePrev.year
        }</span> , which was <span> ${counterPrev}</span> ${
          counterPrev > 1 ? "days" : "day"
        } ago.</p>`;
            }
        }, 0);
    }

}
checkBtn.addEventListener("click", clickHandler);