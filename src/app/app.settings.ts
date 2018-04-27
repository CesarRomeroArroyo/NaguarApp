import { Injectable } from '@angular/core';

@Injectable()
export class  AppSettings {
    // public endPointCore = 'http://mycsoftware.com/zinniaCore/apiCore.php/';
    // public endPointCore = 'http://localhost:56929/api/';
    // public endPointTitan = 'http://localhost:56929/api/';

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    getCurrentDay() {
        const today = new Date();
        let dd = today.getDate().toString();
        let mm = (today.getMonth() + 1).toString();
        const  yyyy = today.getFullYear().toString();
        if (parseInt(dd, 0) < 10) {
            dd = `0${dd}`;
        }

        if (parseInt(mm, 0) < 10) {
            mm = `0${mm}`;
        }
        return `${dd}/${mm}/${yyyy}`;
    }

    getCurrentHour() {
      const d = new Date();
      return `${this.addZero(d.getHours())}:${this.addZero(d.getMinutes())}:${this.addZero(d.getSeconds())}`;
    }

    addZero(i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }
}
