import React, { useEffect, useState, useContext } from "react";
// import { UserContext } from '../context'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";


export function Mycomment(props) {

    let {comment} = props
    let DeleteAPIUrl = `http://127.0.0.1:8000/comment/delete/${comment.id}`
    let navigate = useNavigate()
        

    const sinceWhen = (created_at) => {
        const date = new Date(created_at);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const diffSeconds = Math.round(diff / 1000);
        const diffMinutes = Math.round(diffSeconds / 60);
        const diffHours = Math.round(diffMinutes / 60);
        const diffDays = Math.round(diffHours / 24);

        if (diffSeconds < 60) {
            return "Less than a minute ago"
        } else if (diffMinutes < 60) {
            return `${diffMinutes} minutes ago`
        } else if (diffHours < 24) {
            return `${diffHours} hours ago`
        } else {
            return `${diffDays} days ago`
        }
    }
    

    const deletecomment = () =>
    {
        axios
        .delete(DeleteAPIUrl,
            {
            headers: 
            {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            }
            })
        .then(res => {
            console.log("deleted")
            window.location.reload()
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
    <div className='roomList container' style={{ width:"75vw"}}>

        <div class="roomListRoom ">
                <div class="roomListRoom__header">
                    <a href="profile.html" class="roomListRoom__author">
                        <div class="avatar avatar--small">
                            <img src={comment.author.avatar} alt="pp" />
                        </div>
                        <NavLink className="nav-link" to={`/author/addbook`}>
                            <span>@{comment.author.username}</span>
                        </NavLink >
                    </a>

                    <div class="roomListRoom__actions">
                        <span>{sinceWhen(comment.created_at)}</span>
                    </div>
                    <div className="room__topRight">

                        {/* edit button in the top right */}
                        <a href={`/comment/edit/${comment.id}`} >
                            <svg
                            enable-background="new 0 0 24 24"
                            height="20"
                            viewBox="0 0 24 24"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <title>edit</title>
                            <g>
                                <path d="m23.5 22h-15c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h15c.276 0 .5.224.5.5s-.224.5-.5.5z" />
                            </g>
                            <g>
                                <g>
                                <path
                                    d="m2.5 22c-.131 0-.259-.052-.354-.146-.123-.123-.173-.3-.133-.468l1.09-4.625c.021-.09.067-.173.133-.239l14.143-14.143c.565-.566 1.554-.566 2.121 0l2.121 2.121c.283.283.439.66.439 1.061s-.156.778-.439 1.061l-14.142 14.141c-.065.066-.148.112-.239.133l-4.625 1.09c-.038.01-.077.014-.115.014zm1.544-4.873-.872 3.7 3.7-.872 14.042-14.041c.095-.095.146-.22.146-.354 0-.133-.052-.259-.146-.354l-2.121-2.121c-.19-.189-.518-.189-.707 0zm3.081 3.283h.01z"
                                />
                                </g>
                                <g>
                                <path
                                    d="m17.889 10.146c-.128 0-.256-.049-.354-.146l-3.535-3.536c-.195-.195-.195-.512 0-.707s.512-.195.707 0l3.536 3.536c.195.195.195.512 0 .707-.098.098-.226.146-.354.146z"
                                />
                                </g>
                            </g>
                            </svg>
                        </a>

                        {/* delete buttun in the top right */}
                        <a href="#" onClick={deletecomment}>
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                                <title>remove</title>
                                <path
                                    d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"
                                ></path>
                            </svg>
                        </a>

                    </div>

                </div>

                <div class="roomListRoom__content">
                    <p className="m-3">
                        {comment.content}
                    </p>
                </div>
                
                {/* up vote and down vote  */}
                <div className="d-flex justify-content-around">
                    <div>upvote</div>
                    <div>downvote</div>
                </div>

            </div>

        </div>
    )
}