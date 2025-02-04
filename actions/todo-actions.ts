"use server";

import { Database } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";

export type TodoRow = Database["public"]["Tables"]["todo"]["Row"];
export type TodoRowInsert = Database["public"]["Tables"]["todo"]["Insert"];
export type TodoRowUpdate = Database["public"]["Tables"]["todo"]["Update"];

const handleError = (error: Error) => {
	console.error(error);
	throw new Error(error.message);
};

export const getTodos = async ({
	searchInput = "",
}: {
	searchInput: string;
}) => {
	const supabase = await createServerSupabaseClient();
	const { data, error } = await supabase
		.from("todo")
		.select("*")
		.like("title", `${searchInput}%`)
		.order("created_at", { ascending: true });

	if (error) {
		handleError(error);
	}

	return data;
};

export const createTodo = async (todo: TodoRowInsert) => {
	const supabase = await createServerSupabaseClient();

	const { data, error } = await supabase.from("todo").insert({
		...todo,
		created_at: new Date().toISOString(),
	});

	if (error) {
		handleError(error);
	}

	return data;
};

export const updateTodo = async (todo: TodoRowUpdate) => {
	const supabase = await createServerSupabaseClient();

	const { data, error } = await supabase
		.from("todo")
		.update({
			...todo,
			updated_at: new Date().toISOString(),
		})
		.eq("id", todo.id);

	if (error) {
		handleError(error);
	}

	return data;
};

export const deleteTodo = async (id: TodoRow["id"]) => {
	const supabase = await createServerSupabaseClient();

	const { data, error } = await supabase.from("todo").delete().eq("id", id);

	if (error) {
		handleError(error);
	}

	return data;
};
