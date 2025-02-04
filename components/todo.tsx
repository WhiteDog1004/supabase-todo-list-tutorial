"use client";

import { deleteTodo, TodoRow, updateTodo } from "@/actions/todo-actions";
import { queryClient } from "@/config/ReactQueryClientProvider";
import { Checkbox, IconButton, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Todo = ({ todo }: { todo: TodoRow }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [completed, setCompleted] = useState(todo.completed);
	const [title, setTitle] = useState(todo.title);

	const updateTodoMutation = useMutation({
		mutationFn: () =>
			updateTodo({
				id: todo.id,
				title,
				completed,
			}),

		onSuccess: () => {
			setIsEditing(false);
			queryClient.invalidateQueries({
				queryKey: ["todos"],
			});
		},
	});

	const deleteTodoMutation = useMutation({
		mutationFn: () => deleteTodo(todo.id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["todos"],
			});
		},
	});

	return (
		<div className="flex items-center w-full gap-1">
			<Checkbox
				checked={completed}
				onChange={async (e) => {
					await setCompleted(e.target.checked);
					await updateTodoMutation.mutate();
				}}
			/>

			{isEditing ? (
				<input
					value={title}
					className="flex-1 border-b-black border-b"
					placeholder="Enter your todo"
					onChange={(e) => setTitle(e.target.value)}
				/>
			) : (
				<span className={`flex-1 ${completed && "line-through"}`}>
					{title}
				</span>
			)}

			<IconButton
				onClick={async () => {
					if (!isEditing) {
						return setIsEditing(true);
					}
					await updateTodoMutation.mutate();
				}}
			>
				{updateTodoMutation.isPending ? (
					<Spinner />
				) : (
					<i className={`fas ${isEditing ? "fa-check" : "fa-pen"}`} />
				)}
			</IconButton>
			<IconButton onClick={() => deleteTodoMutation.mutate()}>
				{deleteTodoMutation.isPending ? (
					<Spinner />
				) : (
					<i className="fa fa-trash" />
				)}
			</IconButton>
		</div>
	);
};

export default Todo;
