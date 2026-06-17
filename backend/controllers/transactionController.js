import Transaction from '../models/transactionModel.js';

export const addTransaction = async (req, res) => {
   try {

      const transaction = await Transaction.create(
         {
            user: req.user.id,
            ...req.body
         }
      );
      res.status(201).json({
         success: true,
         transaction
      });

   } catch (error) {

      res.status(500).json({
         success: false,
         message: error.message
      });

   }
};

export const getTransactions = async (req, res) => {
   try {
      const { month, year } = req.query;
      const startDate = new Date(
         Number(year),
         Number(month) - 1,
         1
      )
      const endDate = new Date(
         Number(year),
         Number(month),
         1
      )
      const transactions = await Transaction.find(
         {
            user: req.user.id,
            date: {
               $gte: startDate,
               $lt: endDate
            }
         }
      );

      res.status(201).json({
         success: true,
         transactions
      });

   } catch (error) {

      res.status(500).json({
         success: false,
         message: error.message
      });

   }

};
export const getAllTransactions = async (req, res) => {
   try {
      const transactions = await Transaction.find({ user: req.user.id })
      // console.log(transactions)
      res.status(201).json({
         success: true,
         transactions
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      });

   }
}
export const getMonthlyTransactions = async (req, res) => {
   try {
      const transactions = await Transaction.find({ user: req.user.id })
      const monthlyData = {}
      transactions.forEach((t) => {
         const month = new Date(t.date).getMonth();
         if (!monthlyData[month]) {
            monthlyData[month] = {
               income: 0,
               expense: 0
            };
         }
         if (t.type === "income") {
            monthlyData[month].income += t.amount;
         }
         if (t.type === "expense") {
            monthlyData[month].expense += t.amount;
         }

      })
      const monthNames = [
         "Jan", "Feb", "Mar", "Apr",
         "May", "Jun", "Jul", "Aug",
         "Sep", "Oct", "Nov", "Dec"
      ];
      const chartData = monthNames.map((name, index) => ({
         month: name,
         income: monthlyData[index]?.income || 0,
         expense: monthlyData[index]?.expense || 0,
      }))
      res.status(201).json({
         success: true,
         chartData,
         // transactions
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      });

   }
}
export const deleteTransactions = async (req, res) => {

   try {
      const { id } = req.params;
      const transactions = await Transaction.findByIdAndDelete(
         {
            _id: id,
            user: req.user.id
         }
      );

      res.status(201).json({
         success: true,
         transactions,
         message: "Transaction deleted"
      });

   } catch (error) {

      res.status(500).json({
         success: false,
         message: error.message
      });

   }

};
export const updateTransactions = async (req, res) => {

   try {
      const { id } = req.params;
      // console.log(id)
      const updatedTransaction = await Transaction.findByIdAndUpdate(
         {
            _id: id,
            user: req.user.id
         },
         req.body,
         { new: true }
      );

      res.status(201).json({
         success: true,
         updatedTransaction,
         // message: "Transaction updated"
      });

   } catch (error) {

      res.status(500).json({
         success: false,
         message: error.message
      });

   }

};