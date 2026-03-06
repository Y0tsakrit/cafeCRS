import Dashbord from '../subcomponents/dashbord'


function Topup() {
  return (
    <div className='flex flex-col gap-4 bg-white h-screen'>
        <Dashbord className="items-center"/>
        <div className='flex flex-row gap-8 ml-19 w-[90%]'>
            <div className="flex flex-col gap-4 w-full">
              {[
                { amount: 150, label: 'Minimum' },
                { amount: 300 },
                { amount: 750 },
                { amount: 1500 },
                { amount: 3000 }
              ].map((item, idx) => (
                <div key={item.amount} className="flex flex-row justify-between items-center bg-linear-to-r from-purple-700 to-purple-600 shadow p-4 rounded-md">
                  <div>
                    <div className="font-bold text-white text-lg">TopUp ฿{item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                    {item.label && <div className="mt-1 text-gray-300 text-xs">{item.label}</div>}
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div className="bg-black px-4 py-2 rounded font-mono text-md text-white">฿{item.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                    <button className="bg-lime-600 hover:bg-lime-700 px-4 py-2 rounded font-bold text-white transition">TopUp</button>
                  </div>
                </div>
              ))}
            </div>
        </div>
    </div>
  )
}

export default Topup