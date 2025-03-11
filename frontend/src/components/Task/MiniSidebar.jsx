import React from 'react';
import { StickyNote, CircleCheckBig,FileCheck,Timer } from 'lucide-react';

const MiniSidebar = () => {

    const navItems =[
        {
            icon: <StickyNote size={20}/>,
            title: "All",
            link:"/tasks",
        },
        {
            icon: <FileCheck size={20}/>,
            title: "Completed",
            link:"/tasks/completed",
        },
        {
            icon: <CircleCheckBig size={20}/>,
            title: "Pending",
            link:"/tasks/pending",
        },
        {
            icon: <Timer size={22}/>,
            title: "Overdue",
            link:"/tasks/overdue",
        },
    ]

  return (
    <div className='basis-[3rem] flex flex-col bg-base rounded-[0.3rem] mx-1'>
        <div className='mt-10 flex-1 flex flex-col items-center justify-between'>
            <ul className='flex flex-col gap-10'>
                {navItems.map((item,index)=>(
                    <li key={index} className='relative group'>
                        <a href={item.link}>{item.icon}</a>
                        <span className='absolute top-[50%] translate-y-[50%] left-8 text-xs pointer-events-none text-white bg-[#3aafae] px-2 py-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 duration-300'>
                            {item.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default MiniSidebar;