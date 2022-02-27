import React from 'react';
import { announcements } from '../../data/announcements.js'

function AnnouncementsModal() {
  return (
    <div class="hidden overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full" id="announcements-modal">
      <div class="relative px-4 w-full max-w-4xl h-full md:h-auto">
          {/* Modal content */}
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/*  Modal header */}
              <div class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                  <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                      Announcements
                  </h3>
                  <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="announcements-modal">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
              </div>


              {/* Modal body */}
              <div className="divide-y divide-slate-200">
                {announcements.map((announcement) =>
                <div className="p-3">

                  {/* Card content */}

                  <div>
                      {/* Item */}
                      <div className="bg-slate-50">
                      <li className="flex px-2">

                        <div className="w-9 h-9 rounded-full shrink-0 bg-blue-500 my-2 mr-3">
                          <svg className="w-9 h-9 rounded-full shrink-0 bg-blue-500 stroke-white stroke-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-5 -5 34 34" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d={announcement.icon} />
                          </svg>
                        </div>

                        <div className="grow flex items-center text-sm py-2">
                          <div className="grow flex justify-between">
                            {/* display announcement title, date, and content */}
                            <div className="font-medium text-xs text-slate-400"><a className="font-medium text-base text-slate-800 hover:text-slate-900 pr-3" href="#0">{announcement.title}</a> {announcement.date}
                              <div>{announcement.content}</div>
                            </div>
                          </div>
                        </div>
                      </li>
                      </div>
                  </div>
                </div>
              )}
            </div>
          </div>


      </div>
  </div>
  );
}

export default AnnouncementsModal;
