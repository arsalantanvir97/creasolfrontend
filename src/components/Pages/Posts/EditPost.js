import React from "react";
import { useParams } from "react-router-dom";
import AddEditPost from "./AddEditPost";

const EditPost = () => {
  const { OrderId, PostId } = useParams();
  return (
    <section id="user_page" className="user-page">
      <div className="content-body">
        {/* 
          Mode can Add or Edit
          if mode is edit there must be an orderid as well as postid
          if mode is add there needs to be an orderid only
        */}
        <AddEditPost mode="Edit" OrderId={OrderId} PostId={PostId} />
      </div>
    </section>
  );
};

export default EditPost;
