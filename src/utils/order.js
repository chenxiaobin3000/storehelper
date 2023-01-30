export function getOrderType(type) {
  switch (type) {
    case 1:
      return '仓储入库订单'
    case 2:
      return '仓储退货订单'
    case 3:
      return '生产完成订单'
    case 4:
      return '生产出库订单'
    case 5:
      return '履约退货订单'
    case 6:
      return '履约出货订单'
  }
  return ''
}
