let b = 2

function filter_percent() {
  let percentag_danri = this.percent_limit_obj.percentag_dr //单日
  // 单日过滤值
  if (percentag_danri && percentag_danri !== 0) {
    let percent_danri_limit = (percentag_danri * 100).toFixed(2)
    this.percentageLimit_danri_arr = this.percentageLimit_danri_arr.filter(el => el <=
      percent_danri_limit
    )
 }
}