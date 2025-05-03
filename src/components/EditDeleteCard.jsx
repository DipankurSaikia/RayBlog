import React from "react";

function EditDeleteCard({blog}) {
  return (
    <div className="card h-72 w-[80%] sm:w-52 sm:h-60  bg-[var(--secondary-color)] rounded-lg overflow-hidden cursor-pointer">
      <div className="image w-full h-40 sm:h-32">
        <img src={blog.imgUrl} alt="" className="object-cover h-full w-full" />
      </div>
      <div className="card-bottom px-3 pt-1">
        <h5 className="font-bold text-[var(--text-color1)] mb-3">
          {blog.title}
        </h5>
        <div className="person-image-name flex items-center gap-3">
          <div className="h-8 w-8 rounded-full overflow-hidden">
            <img src={blog.profileUrl} alt="" className="object-cover" />
          </div>
          <span className="text-xs text-[var(--text-color1)]">{blog.name}</span>
        </div>
      </div>
    </div>
  );
}

export default EditDeleteCard;
