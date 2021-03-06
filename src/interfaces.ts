export interface News {
    by: string;
    descendants: number;
    id: number;
    kids: number[];
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
}
export interface State {
    name: string;
    data: News[];
    isLoading: boolean;
    commentsLoading: boolean;
    current: News;
    comments: Comment[];
    newsIDs: number[][];
    nextChunkLoading: boolean
  }
interface Comment {
    by: string;
    id: number;
    kids: number[];
    parent: number;
    text: string;
    time: number;
    type: string;
}