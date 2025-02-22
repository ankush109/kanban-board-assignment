export const ENDPOINTS ={
    DELETE: (taskId: number) => `/task/${taskId}`,
    ADDTASK : () => `/task/create`,
    ADDCOMMENT : (taskData:any) => `/task/addComment/${taskData?.taskId}`,
    DELETECOMMENT : (commentId:number) => `/task/delete-comment/${commentId}` ,
    GETTASKS : () => `/task`,
    GETCOMMENTS : (taskId:number) =>`/task/comment/${taskId}`,
    UPDATETASK : (taskId:number) => `/task/${taskId}`
}