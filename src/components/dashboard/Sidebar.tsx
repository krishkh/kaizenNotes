import "./Sidebar.css";
import folders from "../../utils/data";
import arrow from "../../assets/arrow.svg";
import FileIcon from "../../assets/FileIcon.svg";
import FolderIcon from "../../assets/FolderIcon.svg";
import ChevronRight from "../../assets/ChevronRight.svg";

import { createSignal } from "solid-js";
import {
  setIsMenuOpen,
  isMenuOpen,
  setIsLoading,
} from "../../hooks/common";
interface Props {
  year: string;
}

const Sidebar = (props: Props) => {
  return (
    <>
      <button
        class={`fixed top-4 left-4 bg-[#853232] backdrop-blur-lg ] z-50 rounded-full`}
        onclick={() => setIsMenuOpen(!isMenuOpen())}
      >
        <img
          src={arrow}
          alt=""
          class={`p-2  ${isMenuOpen() && "rotate-180"}`}
        />
      </button>
      <div class=" fixed top-0 left-0 ">
        <div
          class={`bg-[#21204F] h-screen md:flex pt-10 fixed md:relative  text-white p-4 overflow-y-scroll overflow-x-hidden sidebar  ${isMenuOpen()
            ? " w-full md:w-fit overflow-y-scroll "
            : "w-0 p-0 overflow-hidden "
            }`}
        >
          <ul class="mt-10">
            <li class={`my-1.5 ${isMenuOpen() ? " block" : "hidden"}`}>
              <span class="flex items-center gap-1.5">
                <img src={FolderIcon} alt="" class="w-6 h-6" />
                <p class="">
                  {props.year.charAt(0).toUpperCase() + props.year.slice(1)}
                </p>
              </span>
              <ul class="pl-3">
                {folders.map((folder) => (
                  <Folder folder={folder} />
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

type Folder = {
  name: string;
  link?: string;
  folders?: Folder[];
};

function Folder({ folder }: { folder: Folder }) {
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <li class="my-1.5">
      <span class="flex items-center gap-1.5">
        {folder.folders ? (
          <>
            <button
              class="flex items-center gap-1.5"
              onclick={() => setIsOpen(!isOpen())}
            >
              <img
                src={ChevronRight}
                alt=""
                class={`w-3 h-3 ${isOpen() ? "rotate-90" : ``} duration-100`}
              />
              <img src={FolderIcon} alt="" class="w-6 h-6" />
              <p class="">{folder.name.slice(0, 16)}</p>
            </button>
          </>
        ) : (
          <div
            class="flex items-center gap-1.5 hover:cursor-pointer"
            onclick={() => {
              setIsMenuOpen(false);
              const event = new CustomEvent("link-clicked", {
                detail: folder.link,
              });
              window.dispatchEvent(event);
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 1500);
            }}
          >
            <img src={FileIcon} alt="" class="w-6 h-6" />
            <p class="">{folder.name.slice(0, 16)}</p>
          </div>
        )}
      </span>
      {isOpen() && (
        <ul class="pl-6">
          {folder.folders?.map((folder) => (
            <Folder folder={folder} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Sidebar;
