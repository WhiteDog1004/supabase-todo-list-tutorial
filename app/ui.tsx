"use client";

import { createTodo, getTodos } from "@/actions/todo-actions";
import Todo from "@/components/todo";
import { Button, Input } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const UI = () => {
	const [searchInput, setSearchInput] = useState("");

	const todosQuery = useQuery({
		// **searchInput을 queryKey에 포함**
		queryKey: ["todos", searchInput],
		queryFn: () => getTodos({ searchInput }),
	});

	const createTodoMutation = useMutation({
		mutationFn: () =>
			createTodo({
				title: "New Todo",
				completed: false,
			}),

		onSuccess: () => {
			todosQuery.refetch();
		},
	});

	return (
		<div className="w-2/3 mx-auto flex flex-col justify-center items-center py-10 gap-4">
			<h1 className="text-xl">TODO LIST</h1>
			<Input
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
				label="Search TODO"
				placeholder="Search TODO"
				icon={<i className="fas fa-search" />}
			/>

			{todosQuery.isPending && <p>Loading...</p>}
			{todosQuery.data &&
				todosQuery.data.map((todo) => (
					<Todo key={todo.id} todo={todo} />
				))}

			<Button
				onClick={() => createTodoMutation.mutate()}
				loading={createTodoMutation.isPending}
			>
				<i className="fas fa-plus mr-2" />
				ADD TODO
			</Button>
		</div>
	);
};

export default UI;
