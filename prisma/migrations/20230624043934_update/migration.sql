-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified" TEXT,
    "name" TEXT,
    "image" TEXT,
    "html_url" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "created_at" TEXT,
    "updated_at" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repository" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "html_url" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT NOT NULL,
    "git_url" TEXT NOT NULL,
    "ssh_url" TEXT NOT NULL,
    "clone_url" TEXT NOT NULL,
    "homepage" TEXT,
    "stargazers_count" INTEGER NOT NULL,
    "watchers_count" INTEGER NOT NULL,
    "language" TEXT,
    "visibility" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follower" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT NOT NULL,
    "html_url" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Follower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Following" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT NOT NULL,
    "html_url" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Following_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friend" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "htmlUrl" TEXT,
    "user_id" TEXT,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_provider_account_id_key" ON "Account"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_token_key" ON "Session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_name_user_id_key" ON "Repository"("name", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Follower_user_id_id_key" ON "Follower"("user_id", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Following_user_id_id_key" ON "Following"("user_id", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_user_id_key" ON "Friend"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_user_id_id_key" ON "Friend"("user_id", "id");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repository" ADD CONSTRAINT "Repository_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
