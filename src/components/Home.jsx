import React, { useEffect, useState } from "react";
import AuthDetails from "./AuthDetails";
import { galleri } from "../galleri";
import search from "../../public/images/search.svg";
import loader from "../../public/images/loader.gif";
import {
  DndContext,
  closestCenter,
  useSensors,
  TouchSensor,
  useSensor,
  MouseSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Galleri_Item(props) {
  const [hasLoaded, setHasLoaded] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-md max-w-[200px] text-black p-4 min-h-[250px] flex flex-col justify-between"
    >
      {/* container for picture */}
      <div className=" relative w-[180px] min-h-[100px] self-center">
        <div className={`spinner z-[2] ${hasLoaded ? "not-active" : ""}`}></div>

        <img
          className="galleri-pic w-[100%] rounded-md z-[5] relative"
          src={props.pic}
          alt=""
          onLoad={() => {
            setHasLoaded(true);
          }}
        />
      </div>

      {/* tags of item */}
      <p className="italic">{props.tag.join(", ")}</p>
    </div>
  );
}

export default function Home(props) {
  // state
  const [galleris, setGalleris] = useState(galleri);

  const galleriEls = galleris.map((item) => {
    return (
      <Galleri_Item key={item.id} id={item.id} pic={item.pic} tag={item.tag} />
    );
  });

  //   function that rearranges images
  function onDragEnd(e) {
    const { active, over } = e;
    if (active.id === over.id) {
      return;
    }
    setGalleris((users) => {
      const oldIndex = users.findIndex((user) => user.id === active.id);
      const newIndex = users.findIndex((user) => user.id === over.id);
      return arrayMove(users, oldIndex, newIndex);
    });
  }

  //   function that filters through images based on search input
  function handleSearch(e) {
    const value = e.target.value.toLowerCase();

    const newGalleri = galleri.filter((item) => {
      const myString = item.tag.join(" ");

      return myString.includes(value);
    });

    setGalleris(newGalleri);
  }

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  return (
    <div className="w-[100%]">
      <nav className="flex justify-between sticky top-0 z-[20] w-[100%] px-7 items-center py-2 bg-white text-black -800:flex-col -800:gap-2 -800:items-start">
        {/* container for search bar */}
        <div className="relative">
          <input
            onChange={handleSearch}
            className="search border-black border-2 bg-transparent"
            placeholder="search pictures..."
            type="text"
          />
          <img
            className="absolute h-[25px] right-[-30px] -500:right-2 top-[50%] translate-y-[-50%] cursor-pointer"
            src={search}
            alt=""
          />
        </div>

        <AuthDetails changeSuccess={props.changeSuccess} />
      </nav>

        <div className="mt-20">
            
            <h3 className="text-white text-xl mt-10 text-center">Drag and drop to rearrange 🧩</h3>

        <DndContext
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        strategy={rectSortingStrategy}
        sensors={sensors}
      >
        <SortableContext items={galleris}>
          <div className="relative z-[10] galleri-list mt-8 ">
            {galleriEls}
          </div>
        </SortableContext>
      </DndContext>
        </div>
    </div>
  );
}
