import { Document, model, Schema } from "mongoose";

export interface BookType extends Document {
  id: string;
  title: string;
  author: string;
  stock: number;
}

const bookSchema = new Schema<BookType>({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const Book = model<BookType>("Book", bookSchema);

export default Book;
