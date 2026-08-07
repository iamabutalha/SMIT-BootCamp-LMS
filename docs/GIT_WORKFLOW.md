# Bootcamp LMS - Git Workflow (Anti-Conflict Guide)

## 1. Branch Naming
Never commit directly to `main` or `dev`. Always branch off `dev`.
*   `feature/short-description` (e.g., `feature/student-registration`)
*   `fix/bug-description` (e.g., `fix/attendance-crash`)
*   `hotfix/urgent-issue` (Branches directly from `main` for critical live bugs).

## 2. The Daily Workflow
1.  **Pull Latest:** `git checkout dev && git pull origin dev`
2.  **Create Branch:** `git checkout -b feature/my-new-task`
3.  **Commit Often:** Write clear, concise commit messages.
    *   *Bad:* "fixed stuff"
    *   *Good:* "fix: resolve date parsing issue in attendance module"
4.  **Rebase/Merge before PR:** Before opening a PR, ensure you are up to date with `dev` to resolve conflicts locally.
    *   `git fetch origin`
    *   `git merge origin/dev`
5.  **Push:** `git push origin feature/my-new-task`

## 3. Pull Request (PR) Rules
*   **No Self-Merging:** At least one other team member must review and approve the PR before it can be merged into `dev`.
*   **Keep PRs Small:** Reviewing 20 files is hard. Reviewing 3 files is easy. Break large features into smaller, mergeable chunks.
*   **Review Checklist:**
    *   Does the code meet the `CODING_STANDARDS.md`?
    *   If it's a backend PR, does it match the `API_CONTRACT.md`?
    *   Are there any leftover `console.log()` statements?

## 4. Resolving Conflicts
If you encounter a merge conflict, do not panic.
1.  Open the conflicted file in VS Code.
2.  Look for the `<<<<<<< HEAD` markers.
3.  Discuss with Abu Talha (Lead) or the person who wrote the conflicting code if you are unsure which version to keep.
4.  Resolve, save, `git add`, and `git commit`.
