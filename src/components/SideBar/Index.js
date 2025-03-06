"use client"
import gsap from "gsap";
import { useState, useEffect, useRef, forwardRef } from "react"


const SideBar = () => {
    const [isHover, setIsHover] = useState(false);
    const sidebarRef = useRef(null);
    const inputSelect = useRef(null);
    const timeline = useRef(null);

    // Configuramos el timeline una sola vez
    useEffect(() => {
        timeline.current = gsap.timeline({ paused: true });
        // Animamos la altura de 3rem (48px) a 6rem (96px)
        timeline.current.to(sidebarRef.current, {
            height: '5.5rem',
            duration: 0.35,
            ease: 'power2.inOut'
        })
            .to(inputSelect.current, {
                opacity: 1,
                duration: 0.2,
                height: '2.5rem',
                ease: 'power2.inOut'
            }, 0.15)
    }, []);

    // Reproducimos o revertimos el timeline según el hover
    useEffect(() => {
        if (isHover) {
            timeline.current.play();
        } else {
            timeline.current.reverse();
        }
    }, [isHover]);

    return (
        <div
            ref={sidebarRef}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            // Eliminamos la clase hover de Tailwind para que no interfiera con GSAP
            className="flex h-10 w-64 bg-gray-100/[.4] items-center justify-center absolute left-8 px-4 rounded-b-xl"
        >
            <div className="flex-1">
                <CustomSelect setIsHover={setIsHover} ref={inputSelect} />
            </div>
        </div>
    );
};
export default SideBar



const CustomSelect = forwardRef(({
    setIsHover
}, ref) => {
    const days = [
        {
            id: 1,
            name: 'Day 1',
            avatar:
                'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 2,
            name: 'Day 2',
            avatar:
                'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 3,
            name: 'Day 3',
            avatar:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
        },
        {
            id: 4,
            name: 'Day 4',
            avatar:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 5,
            name: 'Day 5',
            avatar:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 6,
            name: 'Day 6',
            avatar:
                'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 7,
            name: 'Day 7',
            avatar:
                'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 8,
            name: 'Day 8',
            avatar:
                'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 9,
            name: 'Day 9',
            avatar:
                'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            id: 10,
            name: 'Day 10',
            avatar:
                'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ]

    const [selected, setSelected] = useState(days[0]);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (day) => {
        setSelected(day);
        setIsOpen(false); // Cerrar el menú desplegable después de seleccionar
        setIsHover(false);
    };
    return (
        <div className="">

            <label id="listbox-label" className="block text-sm font-semibold text-gray-300 text-center mt-1">
                Change Example
            </label>

            <div
                ref={ref}
                className="relative opacity-0 mt-1 h-0">
                <button
                    type="button"
                    className="grid w-full cursor-pointer grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    onClick={() => setIsOpen(!isOpen)} // Mostrar/ocultar el menú
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-labelledby="listbox-label"
                >
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                        <img src={selected.avatar} alt={selected.name} className="h-6 w-6 rounded-full" />
                        <span className="block truncate">{selected.name}</span>
                    </span>
                    <svg
                        className="col-start-1 row-start-1 h-5 w-5 self-center justify-self-end text-gray-500"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {isOpen && (
                    <ul
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                        role="listbox"
                        aria-labelledby="listbox-label"
                    >
                        {days.map((day) => (
                            <li
                                key={day.id}
                                className={`relative cursor-pointer select-none py-2 pl-3 pr-9 ${selected.id === day.id ? 'bg-indigo-600 text-white' : 'text-gray-900'}`}
                                onClick={() => handleSelect(day)}
                                role="option"
                            >
                                <div className="flex items-center">
                                    <img src={day.avatar} alt={day.name} className="h-6 w-6 rounded-full" />
                                    <span className="ml-3 block truncate">{day.name}</span>
                                </div>
                                {selected.id === day.id && (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div >
    );
})