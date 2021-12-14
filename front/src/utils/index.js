import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

export function parseFinancialNumber(number) {
  return Number.parseFloat(number).toFixed(2);
}
export function UporDown(value) {
  if (value > 0) {
    return (
      <>
        <FontAwesomeIcon color="green" icon={faAngleUp} />{" "}
        <span className="text-success">{value}</span>
      </>
    );
  } else {
    return (
      <>
        <FontAwesomeIcon color="red" icon={faAngleDown} />{" "}
        <span className="text-danger">{value}</span>
      </>
    );
  }
}
