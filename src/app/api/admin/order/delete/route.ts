import { connectDatabase } from '@/config/database'
import OrderModel from '@/models/OrderModel'
import { NextRequest, NextResponse } from 'next/server'

// Models: Order, User
import '@/models/OrderModel'
import '@/models/UserModel'
import UserModel from '@/models/UserModel'

// [DELETE]: /admin/order/delete
export async function DELETE(req: NextRequest) {
  console.log('- Delete Orders - ')

  try {
    // connect to database
    await connectDatabase()

    // get order ids to delete
    const { ids } = await req.json()

    // get deleted orders
    const deletedOrders = await OrderModel.find({
      _id: { $in: ids },
    }).lean()

    await Promise.all(
      deletedOrders.map(async (order: any) => {
        const { userId, item } = order

        await UserModel.findByIdAndUpdate(userId, {
          $pull: { courses: { course: item._id } },
        })
      })
    )

    // delete orders
    await OrderModel.deleteMany({
      _id: { $in: ids },
    })

    return NextResponse.json(
      {
        deletedOrders,
        message: `Order "${deletedOrders.map(order => order.code).join(', ')}" ${
          deletedOrders.length > 1 ? 'have' : 'has'
        } been deleted`,
      },
      { status: 200 }
    )
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
