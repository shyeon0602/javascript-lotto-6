import { MissionUtils } from "@woowacourse/mission-utils";
import {
  QUERY,
  MESSAGE,
  ERROR,
  LOTTO_ERROR_MSG,
  PURCHASE_ERROR_MSG,
} from "./Utils/Constants";
import { Lotto } from "./Lotto";
import { Validate } from "./Utils/Validate";

class View {
  static outputPurchaseAmount(input) {
    MissionUtils.Console.print(`${input.length}${MESSAGE.PURCHASE_NUM}`);
    input.forEach((lotto) => {
      print(`[${lotto.getNumbers().join(",")}]`);
    });
    print("");
  }

  static outputResult({ THREE, FOUR, FIVE, BONUS, SIX }, totalProfitRate) {
    MissionUtils.Console.print(`${MESSAGE.RESULT}`);
    MissionUtils.Console.print(`${MESSAGE.THREE_MATCH} - ${THREE}개`);
    MissionUtils.Console.print(`${MESSAGE.FOUR_MATCH} - ${FOUR}개`);
    MissionUtils.Console.print(`${MESSAGE.FIVE_MATCH} - ${FIVE}개`);
    MissionUtils.Console.print(`${MESSAGE.BONUS_MATCH} - ${BONUS}개`);
    MissionUtils.Console.print(`${MESSAGE.SIX_MATCH} - ${SIX}개`);
    MissionUtils.Console.print(
      `${MESSAGE.TOTAL_PROFIT_RATE} ${totalProfitRate}${MESSAGE.PERCENT}`
    );
  }

  static inputPurchaseAmount(callback) {
    MissionUtils.Console.readLineAsync(QUERY.PURCHASE_AMOUNT, (answer) => {
      this.#validatePurchaseAmount(answer);
      print("");
      callback(answer);
    });
  }

  static #validatePurchaseAmount(answer) {
    if (Validate.checkUnitOf1000(answer)) {
      throw new Error(PURCHASE_ERROR_MSG.PURCHASE_AMOUNT);
    }
  }

  static inputLottoNum(callback) {
    MissionUtils.Console.readLineAsync(QUERY.WINNING_NUM, (answer) => {
      this.#validateWinningNum(answer);
      print("");
      callback(answer);
    });
  }

  static #validateWinningNum(answer) {
    if (Validate.checkNaturalNumAndComma(answer)) {
      throw new Error(LOTTO_ERROR_MSG.ONLY_NUM_AND_COMMA);
    } else if (Validate.checkNumRange1to45(answer)) {
      throw new Error(LOTTO_ERROR_MSG.NUM_RANGE_1TO45);
    } else if (Validate.checkDuplicateNum(answer)) {
      throw new Error(LOTTO_ERROR_MSG.DUPLICATE_NUM);
    } else if (Validate.checkInput6Num(answer)) {
      throw new Error(LOTTO_ERROR_MSG.LENGTH_6NUM);
    }
  }

  static inputBonusNum(callback) {
    MissionUtils.Console.readLineAsync(QUERY.BONUS_NUM, (answer) => {
      this.#validateBonusNum(answer);
      print("");
      callback(answer);
    });
  }

  static #validateBonusNum(answer) {
    if (Validate.checkNaturalNumAndComma(answer)) {
      throw new Error(LOTTO_ERROR_MSG.ONLY_NUM_AND_COMMA);
    } else if (Validate.checkNumRange1to45(answer)) {
      throw new Error(LOTTO_ERROR_MSG.NUM_RANGE_1TO45);
    }
  }
}

module.exports = View;
