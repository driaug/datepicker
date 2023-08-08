import React, {useState, useEffect, useRef, MouseEvent} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp, Dot} from 'lucide-react';

const MONTHS = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export interface DatePickerProps {
  onChange: (date: Date) => void;
}

/**
 *
 * @param element
 */
function isNode(element: EventTarget | null): element is Node {
  return element instanceof Node;
}

/**
 *
 * @param root0
 * @param root0.onChange
 */
export default function DatePicker({onChange}: DatePickerProps) {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [no_of_days, setNumDays] = useState<number[]>([]);
  const [blankdays, setBlankDays] = useState<number[]>([]);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (ref.current && !isNode(e.target)) {
        setShowDatepicker(false);
      }
    };

    const eventListener: EventListener = e => checkIfClickedOutside(e as unknown as MouseEvent);

    document.addEventListener('click', eventListener);
    return () => {
      document.removeEventListener('click', eventListener);
    };
  }, [setShowDatepicker]);

  useEffect(() => {
    getNoOfDays();
  }, [month, year]);

  const isToday = (date: number) => {
    const today = new Date();
    const d = new Date(year, month, date);

    return today.toDateString() === d.toDateString();
  };


  const isSelectedDate = (pickedDay: number) => {
    const newDate = new Date(year, month, pickedDay);

    return newDate.toDateString() == date.toDateString();
  };

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = new Date(year, month).getDay();
  
    const blankDaysArray = Array.from({ length: dayOfWeek }, (_, index) => index + 1);
    const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  
    setBlankDays(blankDaysArray);
    setNumDays(daysArray);
  };
  

  return (
    <div className="mx-auto px-4 py-2" ref={ref}>
      <div className="w-80">
        <div className="relative">
          <div
            onClick={() => {
              setShowDatepicker(() => !showDatepicker);
            }}
            className="flex justify-center items-center border border-neutral-100 rounded m-2 w-auto h-8 cursor-pointer text-neutral-800 bg-white"
          >
            <p className="text-sm mx-4">{date.toDateString()}</p>
            <motion.span
              animate={{rotate: showDatepicker ? 180 : 0}}
              transition={{
                duration: 0.2,
                ease: 'easeInOut',
              }}
            >
              <ChevronUp />
            </motion.span>
          </div>
          <AnimatePresence initial={false}>
            {showDatepicker && (
              <motion.div
                className="bg-white mt-10 rounded shadow p-4 absolute top-0 left-0 w-full"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: {opacity: 1},
                  collapsed: {opacity: 0},
                }}
                transition={{duration: 0.3, ease: 'easeInOut'}}
              >
                <motion.div
                  className="flex justify-between items-center mb-3"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: {opacity: 1},
                    collapsed: {opacity: 0},
                  }}
                  transition={{duration: 0.3, ease: 'easeInOut'}}
                >
                  <div>
                    <span className="text-lg font-bold text-neutral-800">{MONTHS[month]}</span>
                    <span className="ml-1 text-lg text-neutral-600 font-normal ">{year}</span>
                  </div>{' '}
                  <div>
                    <button
                      type="button"
                      className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-spring-wood-100 p-0.5 rounded-full"
                      onClick={() => {
                        setYear(prev => prev - 1);
                      }}
                    >
                      <ChevronsLeft size={20} />
                    </button>
                    <button
                      type="button"
                      className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-spring-wood-100 p-0.5 rounded-full"
                      onClick={() => {
                        if (month == 0) {
                          setYear(prev => prev - 1);
                          setMonth(11);
                        } else {
                          setMonth(prev => prev - 1);
                        }
                      }}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-spring-wood-100 p-0.5 rounded-full"
                      onClick={() => {
                        setMonth(new Date().getMonth());
                        setYear(new Date().getFullYear());
                      }}
                    >
                      <Dot size={20} />
                    </button>
                    <button
                      type="button"
                      className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-spring-wood-100 p-0.5 rounded-full"
                      onClick={() => {
                        if (month == 11) {
                          setYear(prev => prev + 1);
                          setMonth(0);
                        } else {
                          setMonth(prev => prev + 1);
                        }
                      }}
                    >
                      <ChevronRight size={20} />
                    </button>
                    <button
                      type="button"
                      className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-spring-wood-100 p-0.5 rounded-full"
                      onClick={() => {
                        setYear(prev => prev + 1);
                      }}
                    >
                      <ChevronsRight size={20} />
                    </button>
                  </div>
                </motion.div>
                <motion.div
                  className="mb-3 -mx-1 grid grid-cols-7"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: {opacity: 1},
                    collapsed: {opacity: 0},
                  }}
                  transition={{duration: 0.3, ease: 'easeInOut'}}
                >
                  {DAYS.map((day, index) => {
                    return (
                      <div className="px-1" key={index}>
                        <div key={index} className="text-neutral-800 font-medium text-center text-xs w-7 ">
                          {day}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
                <motion.div
                  className="flex-wrap -mx-1 grid grid-cols-7"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: {opacity: 1},
                    collapsed: {opacity: 0},
                  }}
                  transition={{duration: 0.3, ease: 'easeInOut'}}
                >
                  {blankdays.map((day, index) => {
                    return (
                      <div className="px-1 mb-1" key={index}>
                        <div
                          key={index}
                          className="cursor-pointer text-center text-sm rounded-lg leading-loose w-7 text-neutral-700"
                        >
                          {}
                        </div>
                      </div>
                    );
                  })}
                  {no_of_days.map((day, index) => {
                    return (
                      <div className="px-1 mb-1" key={index}>
                        <button
                          key={index}
                          onClick={e => {
                            e.preventDefault();

                            const selectedDate = new Date(year, month, day);

                            setDate(selectedDate);
                            onChange(new Date(year, month, day));

                            setShowDatepicker(false);
                          }}
                          className={`${isToday(day) ? 'border border-neutral-300' : ''} ${
                            isSelectedDate(day) ? 'bg-neutral-200' : 'white'
                          } cursor-pointer text-center text-sm rounded-lg leading-loose w-7 hover:bg-neutral-200 transition ease-in-out`}
                        >
                          {day}
                        </button>
                      </div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
