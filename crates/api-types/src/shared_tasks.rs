//! Shared task types for remote task sharing functionality.
//!
//! These types are used for communication between local and remote backends
//! for task sharing features.

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use ts_rs::TS;
use uuid::Uuid;

use crate::UserData;

/// Status of a shared task.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, TS)]
#[serde(rename_all = "lowercase")]
#[ts(export)]
pub enum RemoteTaskStatus {
    Todo,
    InProgress,
    InReview,
    Done,
    Cancelled,
}

/// Request to create a shared task.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CreateSharedTaskRequest {
    pub project_id: Uuid,
    pub title: String,
    pub description: Option<String>,
    pub assignee_user_id: Option<Uuid>,
}

/// Request to update a shared task.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UpdateSharedTaskRequest {
    pub title: Option<String>,
    pub description: Option<String>,
    pub status: Option<RemoteTaskStatus>,
}

/// Request to assign a shared task to a user.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AssignSharedTaskRequest {
    pub new_assignee_user_id: Option<Uuid>,
}

/// Request to check existence of multiple tasks.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CheckTasksRequest {
    pub task_ids: Vec<Uuid>,
}

/// A shared task (database entity).
#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct SharedTask {
    pub id: Uuid,
    pub organization_id: Uuid,
    pub project_id: Uuid,
    pub creator_user_id: Option<Uuid>,
    pub assignee_user_id: Option<Uuid>,
    pub deleted_by_user_id: Option<Uuid>,
    pub title: String,
    pub description: Option<String>,
    pub status: RemoteTaskStatus,
    pub deleted_at: Option<DateTime<Utc>>,
    pub shared_at: Option<DateTime<Utc>>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

/// Response containing a shared task and optional user data.
///
/// Note: UserData is imported from crate::UserData (defined in user.rs).
#[derive(Debug, Clone, Serialize, Deserialize, TS)]
#[ts(export)]
pub struct SharedTaskResponse {
    pub task: SharedTask,
    pub user: Option<UserData>,
}
