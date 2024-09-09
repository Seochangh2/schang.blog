import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "../config";
import { PostDetailType } from "../types";

const useFetchPostDetail = (id: string | undefined) => {
  const [postDetail, setPostDetail] = useState<PostDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const postResponse = await axios.get(`${API_KEY}/posts/detail/${id}`);
        const commentsResponse = await axios.get(`${API_KEY}/comments/${id}`);
        const data = {
          ...postResponse.data,
          tags: JSON.parse(postResponse.data.tags),
          comments: commentsResponse.data,
        };
        setPostDetail(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);
  return { postDetail };
};

export default useFetchPostDetail;
