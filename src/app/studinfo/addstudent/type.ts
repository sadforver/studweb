import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<
  string,
  NzSafeAny
>;
export type MyValidationErrors = Record<string, MyErrorsOptions>;

export class MyValidators extends Validators {
  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.minLength(minLength)(control) === null) {
        return null;
      }
      return {
        minlength: {
          'zh-cn': `最小长度为 ${minLength}`,
          en: `MinLength is ${minLength}`,
        },
      };
    };
  }
  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): MyValidationErrors | null => {
      if (Validators.maxLength(maxLength)(control) === null) {
        return null;
      }
      return {
        maxlength: {
          'zh-cn': `最大长度为 ${maxLength}`,
          en: `MaxLength is ${maxLength}`,
        },
      };
    };
  }

  static idNo(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;
    if (isEmptyInputValue(value)) {
      return null;
    }
    return isIdNo(value)
      ? null
      : {
          idNo: {
            'zh-cn': `身份证号码格式不正确`,
            en: `Identity Card number is not valid`,
          },
        };
  }

  static mobile(control: AbstractControl): MyValidationErrors | null {
    const value = control.value;

    if (isEmptyInputValue(value)) {
      return null;
    }

    return isMobile(value)
      ? null
      : {
          mobile: {
            'zh-cn': `手机号码格式不正确`,
            en: `Mobile phone number is not valid`,
          },
        };
  }
}

function isEmptyInputValue(value: NzSafeAny): boolean {
  return value == null || value.length === 0;
}

function isMobile(value): boolean {
  return typeof value === 'string' && /(^1\d{10}$)/.test(value);
}
function isIdExist(value: string) {
  let pass = false;
  this.SharedService.checkStudId(value).subscribe((res) => {
    console.log(res);
    if (res.count == 0) {
      pass = true;
    }
  });
  return pass;
}

function isIdNo(value: string) {
  var city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 ',
  };
  var pass = true;

  if (
    !value ||
    !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
      value
    )
  ) {
    pass = false;
  }

  if (!city[value.substr(0, 2)]) {
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (value.length == 18) {
      var code;
      code = value.split('');
      //∑(ai×Wi)(mod 11)//加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = Number(value[i]);
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != value[17]) {
        pass = false;
      }
    }
  }

  return pass;
}
