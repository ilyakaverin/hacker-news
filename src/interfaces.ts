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
interface Comment {
    by: string;
    id: number;
    kids: number[];
    parent: number;
    text: string;
    time: number;
    type: string;
}
export interface State {
    name: string;
    data: News[];
    isLoading: boolean;
    commentsLoading: boolean;
    current: News;
    comments: Comment[];
    newsIDs: number[][];
    nextChunkLoading: boolean;
    isDisabledRefresh: boolean;
    currentNewsChunk: number;
  }
export interface HackerNewsState {
    news: State
  }

  export interface Story {
    id: number;
    text: string;
    by: string;
    kids: Array<number>;
  }
