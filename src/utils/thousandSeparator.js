export default function thousandSeperator(x, type = 1) {
  if (type === 1) {
    x = String(x).replace(/,/g, "");
    var nf = new Intl.NumberFormat();
    return nf.format(x) === "NaN" ? 0 : nf.format(x);
  } else return String(x).replace(/,/g, "");
}
