export interface AgentVariables{
  /** The local path on the agent where all folders for a given build pipeline are
          created. This variable has the same value as <code>Pipeline.Workspace</code>. For example:
          <code>/home/vsts/work/1</code>.
  */
  AGENT_BUILDDIRECTORY: string,

  /** A mapping from container resource names in YAML to their Docker IDs at
          runtime.<br><br>Example follows table.
  */
  AGENT_CONTAINERMAPPING: string,

  /** The directory the agent is installed into. This contains the agent software. For
          example: <code>c:\agent</code>.
  */
  AGENT_HOMEDIRECTORY: string,

  /** The ID of the agent.
      */
  AGENT_ID: string,

  /** The name of the running job. This will usually be "Job"; or "__default", but in
          multi-config scenarios, will be the configuration.
  */
  AGENT_JOBNAME: string,

  /** The status of the build.<br>
          <ul>
            <li><code>Canceled</code></li>
            <li><code>Failed</code></li>
            <li><code>Succeeded</code></li>
            <li><code>SucceededWithIssues</code> (partially successful)</li>
          </ul>The environment variable should be referenced as <code>AGENT_JOBSTATUS</code>. The older
          <code>agent.jobstatus</code> is available for backwards compatibility.

      */
  AGENT_JOBSTATUS: string,

  /** The name of the machine on which the agent is installed.
      */
  AGENT_MACHINENAME: string,

  /** The name of the agent that is registered with the pool.<br><br>If you're using a
          self-hosted agent, then this name is specified by you. See <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops"
            data-linktype="relative-path">agents</a>.
  */
  AGENT_NAME: string,

  /** The operating system of the agent host. Valid values are:<br>
          <ul>
            <li><code>Windows_NT</code></li>
            <li><code>Darwin</code></li>
            <li><code>Linux</code></li>
          </ul>If you're running in a container, the agent host and container may be running different operating
          systems.

      */
  AGENT_OS: string,

  /** The operating system processor architecture of the agent host. Valid values
          are:<br>
          <ul>
            <li><code>X86</code></li>
            <li><code>X64</code></li>
            <li><code>ARM</code></li>
          </ul>

      */
  AGENT_OSARCHITECTURE: string,

  /** A temporary folder that is cleaned after each pipeline job. This directory is
          used by tasks such as <a href="/en-us/azure/devops/pipelines/tasks/reference/dotnet-core-cli-v2"
            data-linktype="absolute-path">.NET Core CLI task</a> to hold temporary items like test results before
          they're published.<br><br>For example: <code>/home/vsts/work/_temp</code> for Ubuntu.
  */
  AGENT_TEMPDIRECTORY: string,

  /** The directory used by tasks such as <a
            href="/en-us/azure/devops/pipelines/tasks/reference/node-tool-v0" data-linktype="absolute-path">Node Tool
            Installer</a> and <a href="/en-us/azure/devops/pipelines/tasks/reference/use-python-version-v0"
            data-linktype="absolute-path">Use Python Version</a> to switch between multiple versions of a
          tool.<br><br>These tasks add tools from this directory to <code>PATH</code> so that subsequent build steps
          can use them.<br><br>Learn about <a href="https://go.microsoft.com/fwlink/?linkid=2008884"
            data-linktype="external">managing this directory on a self-hosted agent</a>.
  */
  AGENT_TOOLSDIRECTORY: string,

  /** The working directory for this agent.<br><br>For example:
          <code>c:\agent_work</code>.<br><br>Note: This directory isn't guaranteed to be writable by pipeline tasks
          (for example, when mapped into a container)
  */
  AGENT_WORKFOLDER: string,

}






export interface BuildVariables{
  /** The local path on the agent where any artifacts are copied to before being
          pushed to their destination. For example: <code>c:\agent_work\1\a</code>.<br><br>A typical way to use this
          folder is to publish your build artifacts with the <a
            href="/en-us/azure/devops/pipelines/tasks/reference/copy-files-v2" data-linktype="absolute-path">Copy
            files</a> and <a href="/en-us/azure/devops/pipelines/tasks/reference/publish-build-artifacts-v1"
            data-linktype="absolute-path">Publish build artifacts</a> tasks.<br><br>Note:
          Build.ArtifactStagingDirectory and Build.StagingDirectory are interchangeable. This directory is purged
          before each new build, so you don't have to clean it up yourself.<br><br>See <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/artifacts/artifacts-overview?view=azure-devops"
            data-linktype="relative-path">Artifacts in Azure Pipelines</a>.<br><br>This variable is agent-scoped, and
          can be used as an environment variable in a script and as a parameter in a build task, but not as part of
          the build number or as a version control tag.
  */
  BUILD_ARTIFACTSTAGINGDIRECTORY: string,

  /** The ID of the record for the completed build.
      */
  BUILD_BUILDID: string,

  /** The name of the completed build, also known as the run number. You can specify
          <a href="https://learn.microsoft.com/en-us/azure/devops/pipelines/process/run-number?view=azure-devops"
            data-linktype="relative-path">what is included</a> in this value.<br><br>A typical use of this variable is
          to make it part of the label format, which you specify on the <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/repos/?view=azure-devops"
            data-linktype="relative-path">repository tab</a>.<br><br>Note: This value can contain whitespace or other
          invalid label characters. In these cases, the <a
            href="https://learn.microsoft.com/en-us/azure/devops/repos/tfvc/labels-command?view=azure-devops"
            data-linktype="relative-path">label format</a> fails.<br><br>This variable is agent-scoped, and can be
          used as an environment variable in a script and as a parameter in a build task, but not as part of the build
          number or as a version control tag.
  */
  BUILD_BUILDNUMBER: string,

  /** The URI for the build. For example:
          <code>vstfs:///Build/Build/1430</code>.<br><br>This variable is agent-scoped, and can be used as an
          environment variable in a script and as a parameter in a build task, but not as part of the build number or
          as a version control tag.
  */
  BUILD_BUILDURI: string,

  /** The local path on the agent you can use as an output folder for compiled
          binaries.<br><br>By default, new build pipelines aren't set up to clean this directory. You can define your
          build to clean it up on the <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/repos/?view=azure-devops"
            data-linktype="relative-path">Repository tab</a>.<br><br>For example:
          <code>c:\agent_work\1\b</code>.<br><br>This variable is agent-scoped, and can be used as an environment
          variable in a script and as a parameter in a build task, but not as part of the build number or as a version
          control tag.
  */
  BUILD_BINARIESDIRECTORY: string,

  /** The ID of the container for your artifact. When you upload an artifact in your
          pipeline, it's added to a container that is specific for that particular artifact.
  */
  BUILD_CONTAINERID: string,

  /** The <code>displayName</code> of the cron schedule that triggered the pipeline
          run. This variable is only set if the pipeline run is triggered by a YAML scheduled trigger. For more
          information, see <a
            href="/en-us/azure/devops/pipelines/yaml-schema/schedules-cron#buildcronscheduledisplayname-variable"
            data-linktype="absolute-path">schedules.cron definition - Build.CronSchedule.DisplayName variable</a>
  */
  BUILD_CRONSCHEDULE_DISPLAYNAME: string,

  /** The name of the build pipeline.<br><br>Note: This value can contain whitespace
          or other invalid label characters. In these cases, the <a
            href="https://learn.microsoft.com/en-us/azure/devops/repos/tfvc/labels-command?view=azure-devops"
            data-linktype="relative-path">label format</a> fails.
  */
  BUILD_DEFINITIONNAME: string,

  /** The version of the build pipeline.
      */
  BUILD_DEFINITIONVERSION: string,

  /** See "<a href="#identity_values" data-linktype="self-bookmark">How are the
            identity variables set?</a>".<br><br>Note: This value can contain whitespace or other invalid label
          characters. In these cases, the <a
            href="https://learn.microsoft.com/en-us/azure/devops/repos/tfvc/labels-command?view=azure-devops"
            data-linktype="relative-path">label format</a> fails.
  */
  BUILD_QUEUEDBY: string,

  /** See "<a href="#identity_values" data-linktype="self-bookmark">How are the
            identity variables set?</a>".
  */
  BUILD_QUEUEDBYID: string,

  /** The event that caused the build to run.<br>
          <ul>
            <li><code>Manual</code>: A user manually queued the build.</li>
            <li><code>IndividualCI</code>: <strong>Continuous integration (CI)</strong> triggered by a Git push or a
              TFVC check-in.</li>
            <li><code>BatchedCI</code>: <strong>Continuous integration (CI)</strong> triggered by a Git push or a TFVC
              check-in, and the <strong>Batch changes</strong> was selected.</li>
            <li><code>Schedule</code>: <strong>Scheduled</strong> trigger.</li>
            <li><code>ValidateShelveset</code>: A user manually queued the build of a specific TFVC shelveset.</li>
            <li><code>CheckInShelveset</code>: <strong>Gated check-in</strong> trigger.</li>
            <li><code>PullRequest</code>: The build was triggered by a Git branch policy that requires a build.</li>
            <li><code>BuildCompletion</code>: The build was <a
                href="https://learn.microsoft.com/en-us/azure/devops/pipelines/process/pipeline-triggers?view=azure-devops"
                data-linktype="relative-path">triggered by another build</a></li>
            <li><code>ResourceTrigger</code>: The build was <a
                href="https://learn.microsoft.com/en-us/azure/devops/pipelines/process/resources?view=azure-devops"
                data-linktype="relative-path">triggered by a resource trigger</a> or it was <a
                href="https://learn.microsoft.com/en-us/azure/devops/pipelines/process/pipeline-triggers?view=azure-devops"
                data-linktype="relative-path">triggered by another build</a>.</li>
          </ul>See <a href="https://learn.microsoft.com/en-us/azure/devops/pipelines/build/triggers?view=azure-devops"
            data-linktype="relative-path">Build pipeline triggers</a>, <a
            href="https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops"
            data-linktype="relative-path">Improve code quality with branch policies</a>.

      */
  BUILD_REASON: string,

  /** The value you've selected for <strong>Clean</strong> in the <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/repos/?view=azure-devops"
            data-linktype="relative-path">source repository settings</a>.<br><br>This variable is agent-scoped, and
          can be used as an environment variable in a script and as a parameter in a build task, but not as part of
          the build number or as a version control tag.
  */
  BUILD_REPOSITORY_CLEAN: string,

  /** The local path on the agent where your source code files are downloaded. For
          example: <code>c:\agent_work\1\s</code>.<br><br>By default, new build pipelines update only the changed
          files. You can modify how files are downloaded on the <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/repos/?view=azure-devops"
            data-linktype="relative-path">Repository tab</a>.<br><br>Important note: If you check out only one Git
          repository, this path is the exact path to the code.<br><br>If you check out multiple repositories, the
          behavior is as follows (and might differ from the value of the Build.SourcesDirectory variable):<br>
          <ul>
            <li>If the checkout step for the self (primary) repository has no custom checkout path defined, or the
              checkout path is the multi-checkout default path
              <code>$(Pipeline.Workspace)/s/&amp;&lt;RepoName&gt;</code> for the self repository, the value of this
              variable reverts to its default value, which is <code>$(Pipeline.Workspace)/s</code>.</li>
            <li>If the checkout step for the self (primary) repository does have a custom checkout path defined (and
              it's not its multi-checkout default path), this variable contains the exact path to the self repository.
            </li>
          </ul>This variable is agent-scoped, and can be used as an environment variable in a script and as a
          parameter in a build task, but not as part of the build number or as a version control tag.

      */
  BUILD_REPOSITORY_LOCALPATH: string,

  /** The unique identifier of the <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/repos/?view=azure-devops"
            data-linktype="relative-path">repository</a>.<br><br>This won't change, even if the name of the repository
          does.<br><br>This variable is agent-scoped, and can be used as an environment variable in a script and as a
          parameter in a build task, but not as part of the build number or as a version control tag.
  */
  BUILD_REPOSITORY_ID: string,

  /** The name of the triggering <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/repos/?view=azure-devops"
            data-linktype="relative-path">repository</a>.<br><br>This variable is agent-scoped, and can be used as an
          environment variable in a script and as a parameter in a build task, but not as part of the build number or
          as a version control tag.
  */
  BUILD_REPOSITORY_NAME: string,

  /** The type of the triggering <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/repos/?view=azure-devops"
            data-linktype="relative-path">repository</a>.<br>
          <ul>
            <li><code>TfsGit</code>: <a
                href="https://learn.microsoft.com/en-us/azure/devops/repos/git/?view=azure-devops"
                data-linktype="relative-path">TFS Git repository</a></li>
            <li><code>TfsVersionControl</code>: <a
                href="https://learn.microsoft.com/en-us/azure/devops/repos/tfvc/what-is-tfvc?view=azure-devops"
                data-linktype="relative-path">Team Foundation Version Control</a></li>
            <li><code>Git</code>: Git repository hosted on an external server</li>
            <li><code>GitHub</code></li>
            <li><code>Svn</code>: Subversion</li>
          </ul>This variable is agent-scoped, and can be used as an environment variable in a script and as a
          parameter in a build task, but not as part of the build number or as a version control tag.

      */
  BUILD_REPOSITORY_PROVIDER: string,

  /** Defined if your <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/repos/?view=azure-devops"
            data-linktype="relative-path">repository</a> is Team Foundation Version Control. The name of the <a
            href="https://learn.microsoft.com/en-us/azure/devops/repos/tfvc/create-work-workspaces?view=azure-devops"
            data-linktype="relative-path">TFVC workspace</a> used by the build agent.<br><br>For example, if the
          Agent.BuildDirectory is <code>c:\agent_work\12</code> and the Agent.Id is <code>8</code>, the workspace name
          could be: <code>ws_12_8</code><br><br>This variable is agent-scoped, and can be used as an environment
          variable in a script and as a parameter in a build task, but not as part of the build number or as a version
          control tag.
  */
  BUILD_REPOSITORY_TFVC_WORKSPACE: string,

  /** The URL for the triggering repository. For example:<br>
          <ul>
            <li>Git: <a href="https://dev.azure.com/fabrikamfiber/_git/Scripts"
                data-linktype="external">https://dev.azure.com/fabrikamfiber/_git/Scripts</a></li>
            <li>TFVC: <a href="https://dev.azure.com/fabrikamfiber/"
                data-linktype="external">https://dev.azure.com/fabrikamfiber/</a></li>
          </ul>This variable is agent-scoped, and can be used as an environment variable in a script and as a
          parameter in a build task, but not as part of the build number or as a version control tag.

      */
  BUILD_REPOSITORY_URI: string,

  /** See "<a href="#identity_values" data-linktype="self-bookmark">How are the
            identity variables set?</a>".<br><br>Note: This value can contain whitespace or other invalid label
          characters. In these cases, the <a
            href="https://learn.microsoft.com/en-us/azure/devops/repos/tfvc/labels-command?view=azure-devops"
            data-linktype="relative-path">label format</a> fails.
  */
  BUILD_REQUESTEDFOR: string,

  /** See "<a href="#identity_values" data-linktype="self-bookmark">How are the
            identity variables set?</a>".
  */
  BUILD_REQUESTEDFOREMAIL: string,

  /** See "<a href="#identity_values" data-linktype="self-bookmark">How are the
            identity variables set?</a>".
  */
  BUILD_REQUESTEDFORID: string,

  /** The branch of the triggering repo the build was queued for. Some examples:<br>
          <ul>
            <li>Git repo branch: <code>refs/heads/main</code></li>
            <li>Git repo pull request: <code>refs/pull/1/merge</code></li>
            <li>TFVC repo branch: <code>$/teamproject/main</code></li>
            <li>TFVC repo gated check-in: <code>Gated_2016-06-06_05.20.51.4369;username@live.com</code></li>
            <li>TFVC repo shelveset build: <code>myshelveset;username@live.com</code></li>
            <li>When your pipeline is triggered by a tag: <code>refs/tags/your-tag-name</code></li>
          </ul>When you use this variable in your build number format, the forward slash characters (<code>/</code>)
          are replaced with underscore characters <code>_</code>).<br><br>Note: In TFVC, if you're running a gated
          check-in build or manually building a shelveset, you can't use this variable in your build number format.

      */
  BUILD_SOURCEBRANCH: string,

  /** The name of the branch in the triggering repo the build was queued for.<br>
          <ul>
            <li>Git repo branch, pull request, or tag: The last path segment in the ref. For example, in
              <code>refs/heads/main</code> this value is <code>main</code>. In <code>refs/heads/feature/tools</code>
              this value is <code>tools</code>. In <code>refs/tags/your-tag-name</code> this value is
              <code>your-tag-name</code>.</li>
            <li>TFVC repo branch: The last path segment in the root server path for the workspace. For example, in
              <code>$/teamproject/main</code> this value is <code>main</code>.</li>
            <li>TFVC repo gated check-in or shelveset build is the name of the shelveset. For example,
              <code>Gated_2016-06-06_05.20.51.4369;username@live.com</code> or
              <code>myshelveset;username@live.com</code>.</li>
          </ul>Note: In TFVC, if you're running a gated check-in build or manually building a shelveset, you can't use
          this variable in your build number format.

      */
  BUILD_SOURCEBRANCHNAME: string,

  /** The local path on the agent where your source code files are downloaded. For
          example: <code>c:\agent_work\1\s</code>.<br><br>By default, new build pipelines update only the changed
          files. <br><br>Important note: If you check out only one Git repository, this path is the exact path to the
          code. If you check out multiple repositories, it reverts to its default value, which is
          <code>$(Pipeline.Workspace)/s</code>, even if the self (primary) repository is checked out to a custom path
          different from its multi-checkout default path <code>$(Pipeline.Workspace)/s/&lt;RepoName&gt;</code> (in
          this respect, the variable differs from the behavior of the Build.Repository.LocalPath
          variable).<br><br>This variable is agent-scoped, and can be used as an environment variable in a script and
          as a parameter in a build task, but not as part of the build number or as a version control tag.
  */
  BUILD_SOURCESDIRECTORY: string,

  /** The latest version control change of the triggering repo that is included in
          this build.<br>
          <ul>
            <li>Git: The <a href="https://learn.microsoft.com/en-us/azure/devops/repos/git/commits?view=azure-devops"
                data-linktype="relative-path">commit</a> ID.</li>
            <li>TFVC: the <a
                href="https://learn.microsoft.com/en-us/azure/devops/repos/tfvc/find-view-changesets?view=azure-devops"
                data-linktype="relative-path">changeset</a>.</li>
          </ul>This variable is agent-scoped, and can be used as an environment variable in a script and as a
          parameter in a build task, but not as part of the build number or as a version control tag.

      */
  BUILD_SOURCEVERSION: string,

  /** The comment of the commit or changeset for the triggering repo. We truncate the
          message to the first line or 200 characters, whichever is shorter.<br><br>The
          <code>Build.SourceVersionMessage</code> corresponds to the message on <code>Build.SourceVersion</code>
          commit. The <code>Build.SourceVersion</code> commit for a PR build is the merge commit (not the commit on
          the source branch).<br><br>This variable is agent-scoped, and can be used as an environment variable in a
          script and as a parameter in a build task, but not as part of the build number or as a version control
          tag.<br><br>Also, this variable is only available on the step level and is not available in the job or stage
          levels (that is, the message isn't extracted until the job starts and the code is checked out).<br><br>Note:
          This variable is available in TFS 2015.4.<br><br>Note: The <strong>Build.SourceVersionMessage</strong>
          variable does not work with classic build pipelines in Bitbucket repositories when <strong>Batch changes
            while a build is in progress</strong> is enabled.
          */
  BUILD_SOURCEVERSIONMESSAGE: string,

  /** The local path on the agent where any artifacts are copied to before being
          pushed to their destination. For example: <code>c:\agent_work\1\a</code>.<br><br>A typical way to use this
          folder is to publish your build artifacts with the <a
            href="/en-us/azure/devops/pipelines/tasks/reference/copy-files-v2" data-linktype="absolute-path">Copy
            files</a> and <a href="/en-us/azure/devops/pipelines/tasks/reference/publish-build-artifacts-v1"
            data-linktype="absolute-path">Publish build artifacts</a> tasks.<br><br>Note:
          Build.ArtifactStagingDirectory and Build.StagingDirectory are interchangeable. This directory is purged
          before each new build, so you don't have to clean it up yourself.<br><br> See <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/artifacts/artifacts-overview?view=azure-devops"
            data-linktype="relative-path">Artifacts in Azure Pipelines</a>.<br><br>This variable is agent-scoped, and
          can be used as an environment variable in a script and as a parameter in a build task, but not as part of
          the build number or as a version control tag.
  */
  BUILD_STAGINGDIRECTORY: string,

  /** The value you've selected for <strong>Checkout submodules</strong> on the <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/repos/?view=azure-devops"
            data-linktype="relative-path">repository tab</a>. With multiple repos checked out, this value tracks the
          triggering repository's setting.<br><br>This variable is agent-scoped, and can be used as an environment
          variable in a script and as a parameter in a build task, but not as part of the build number or as a version
          control tag.
  */
  BUILD_REPOSITORY_GIT_SUBMODULECHECKOUT: string,

  /** Defined if your <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/repos/?view=azure-devops"
            data-linktype="relative-path">repository</a> is Team Foundation Version Control.<br><br>If you're running
          a <a href="https://learn.microsoft.com/en-us/azure/devops/pipelines/repos/tfvc?view=azure-devops#gated"
            data-linktype="relative-path">gated build</a> or a <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/create-first-pipeline?view=azure-devops#queueabuild"
            data-linktype="relative-path">shelveset build</a>, this is set to the name of the <a
            href="https://learn.microsoft.com/en-us/azure/devops/repos/tfvc/suspend-your-work-manage-your-shelvesets?view=azure-devops"
            data-linktype="relative-path">shelveset</a> you're building.<br><br>Note: This variable yields a value
          that is invalid for build use in a build number format.
  */
  BUILD_SOURCETFVCSHELVESET: string,

  /** If the build was <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/process/pipeline-triggers?view=azure-devops"
            data-linktype="relative-path">triggered by another build</a>, then this variable is set to the BuildID of
          the triggering build. In Classic pipelines, this variable is triggered by a build completion
          trigger.<br><br>This variable is agent-scoped, and can be used as an environment variable in a script and as
          a parameter in a build task, but not as part of the build number or as a version control tag.<br><br>If
          you're triggering a YAML pipeline using <code>resources</code>, you should use the <a
            href="/en-us/azure/devops/pipelines/yaml-schema/resources-pipelines-pipeline#the-pipeline-resource-metadata-as-predefined-variables"
            data-linktype="absolute-path">resources variables</a> instead.
  */
  BUILD_TRIGGEREDBY_BUILDID: string,

  /** If the build was <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/process/pipeline-triggers?view=azure-devops"
            data-linktype="relative-path">triggered by another build</a>, then this variable is set to the
          DefinitionID of the triggering build. In Classic pipelines, this variable is triggered by a build completion
          trigger.<br><br>This variable is agent-scoped, and can be used as an environment variable in a script and as
          a parameter in a build task, but not as part of the build number or as a version control tag. <br><br>If
          you're triggering a YAML pipeline using <code>resources</code>, you should use the <a
            href="/en-us/azure/devops/pipelines/yaml-schema/resources-pipelines-pipeline#the-pipeline-resource-metadata-as-predefined-variables"
            data-linktype="absolute-path">resources variables</a> instead.
  */
  BUILD_TRIGGEREDBY_DEFINITIONID: string,

  /** If the build was <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/process/pipeline-triggers?view=azure-devops"
            data-linktype="relative-path">triggered by another build</a>, then this variable is set to the name of the
          triggering build pipeline. In Classic pipelines, this variable is triggered by a build completion
          trigger.<br><br>This variable is agent-scoped, and can be used as an environment variable in a script and as
          a parameter in a build task, but not as part of the build number or as a version control tag. <br><br>If
          you're triggering a YAML pipeline using <code>resources</code>, you should use the <a
            href="/en-us/azure/devops/pipelines/yaml-schema/resources-pipelines-pipeline#the-pipeline-resource-metadata-as-predefined-variables"
            data-linktype="absolute-path">resources variables</a> instead.
  */
  BUILD_TRIGGEREDBY_DEFINITIONNAME: string,

  /** If the build was <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/process/pipeline-triggers?view=azure-devops"
            data-linktype="relative-path">triggered by another build</a>, then this variable is set to the number of
          the triggering build. In Classic pipelines, this variable is triggered by a build completion
          trigger.<br><br>This variable is agent-scoped, and can be used as an environment variable in a script and as
          a parameter in a build task, but not as part of the build number or as a version control tag.<br><br>If
          you're triggering a YAML pipeline using <code>resources</code>, you should use the <a
            href="/en-us/azure/devops/pipelines/yaml-schema/resources-pipelines-pipeline#the-pipeline-resource-metadata-as-predefined-variables"
            data-linktype="absolute-path">resources variables</a> instead.
  */
  BUILD_TRIGGEREDBY_BUILDNUMBER: string,

  /** If the build was <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/process/pipeline-triggers?view=azure-devops"
            data-linktype="relative-path">triggered by another build</a>, then this variable is set to ID of the
          project that contains the triggering build. In Classic pipelines, this variable is triggered by a build
          completion trigger.<br><br>This variable is agent-scoped, and can be used as an environment variable in a
          script and as a parameter in a build task, but not as part of the build number or as a version control tag.
          <br><br>If you're triggering a YAML pipeline using <code>resources</code>, you should use the <a
            href="/en-us/azure/devops/pipelines/yaml-schema/resources-pipelines-pipeline#the-pipeline-resource-metadata-as-predefined-variables"
            data-linktype="absolute-path">resources variables</a> instead.
  */
  BUILD_TRIGGEREDBY_PROJECTID: string,

  /** The local path on the agent where the test results are created. For example:
          <code>c:\agent_work\1\TestResults</code>.<br><br>This variable is agent-scoped, and can be used as an
          environment variable in a script and as a parameter in a build task, but not as part of the build number or
          as a version control tag.
  */
  COMMON_TESTRESULTSDIRECTORY: string,
}

export interface PipelineVariables{
  /** Workspace directory for a particular pipeline. This variable has the same value
          as <code>Agent.BuildDirectory</code>. For example, <code>/home/vsts/work/1</code>.
  */
  PIPELINE_WORKSPACE: string,
}

export interface DeploymentJobVariables {
  /** Name of the environment targeted in the deployment job to run the deployment
          steps and record the deployment history. For example, <code>smarthotel-dev</code>.
  */
  ENVIRONMENT_NAME: string,

  /** ID of the environment targeted in the deployment job. For example,
          <code>10</code>.
  */
  ENVIRONMENT_ID: string,

  /** Name of the specific resource within the environment targeted in the deployment
          job to run the deployment steps and record the deployment history. For example, <code>bookings</code> which
          is a Kubernetes namespace that has been added as a resource to the environment <code>smarthotel-dev</code>.

      */
  ENVIRONMENT_RESOURCENAME: string,

  /** ID of the specific resource within the environment targeted in the deployment
          job to run the deployment steps. For example, <code>4</code>.
  */
  ENVIRONMENT_RESOURCEID: string,

  /** The name of the deployment strategy: <code>canary</code>, <code>runOnce</code>,
          or <code>rolling</code>.
  */
  STRATEGY_NAME: string,

  /** The current cycle name in a deployment. Options are <code>PreIteration</code>,
          <code>Iteration</code>, or <code>PostIteration</code>.
  */
  STRATEGY_CYCLENAME: string,

}


export interface SystemVariables {
  /** <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/scripts/powershell?view=azure-devops#example-powershell-script-access-rest-api"
            data-linktype="relative-path">Use the OAuth token to access the REST API</a>
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops#systemaccesstoken"
            data-linktype="relative-path">Use System.AccessToken from YAML scripts</a>.<br><br>This variable is
          agent-scoped, and can be used as an environment variable in a script and as a parameter in a build task, but
          not as part of the build number or as a version control tag.</td>
  */
  SYSTEM_ACCESSTOKEN: string,

  /** The GUID of the TFS collection or Azure DevOps organization.
      */
  SYSTEM_COLLECTIONID: string,

  /** The URI of the TFS collection or Azure DevOps organization. For example:
          <code>https://dev.azure.com/fabrikamfiber/</code>.
  */
  SYSTEM_COLLECTIONURI: string,

  /** The local path on the agent where your source code files are downloaded. For
          example: <code>c:\agent_work\1\s</code><br><br>By default, new build pipelines update only the changed
          files. You can modify how files are downloaded on the <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/repos/?view=azure-devops"
            data-linktype="relative-path">Repository tab</a>.
          <br><br>
          This variable is agent-scoped. It can be used as an environment variable in a script and as a parameter in a
          build task, but not as part of the build number or as a version control tag.

      */
  SYSTEM_DEFAULTWORKINGDIRECTORY: string,

  /** The ID of the build pipeline.
      */
  SYSTEM_DEFINITIONID: string,

  /** Set to <code>build</code> if the pipeline is a build. For a release, the values
          are <code>deployment</code> for a Deployment group job, <code>gates</code> during evaluation of gates, and
          <code>release</code> for other (Agent and Agentless) jobs.
  */
  SYSTEM_HOSTTYPE: string,

  /** Set to 1 the first time this job is attempted, and increments every time the job
          is retried.
  */
  SYSTEM_JOBATTEMPT: string,

  /** The human-readable name given to a job.
      */
  SYSTEM_JOBDISPLAYNAME: string,

  /** A unique identifier for a single attempt of a single job. The value is unique to
          the current pipeline.
  */
  SYSTEM_JOBID: string,

  /** The name of the job, typically used for expressing dependencies and accessing
          output variables.
  */
  SYSTEM_JOBNAME: string,

  /** Set to 1 the first time this phase is attempted, and increments every time the
          job is retried.<br><br>Note: "Phase" is a mostly redundant concept, which represents the design-time for a
          job (whereas job was the runtime version of a phase). We've mostly removed the concept of "phase" from Azure
          Pipelines. Matrix and multi-config jobs are the only place where "phase" is still distinct from "job." One
          phase can instantiate multiple jobs, which differ only in their inputs.
  */
  SYSTEM_PHASEATTEMPT: string,

  /** The human-readable name given to a phase.
      */
  SYSTEM_PHASEDISPLAYNAME: string,

  /** string-based
          and accessing output variables.</td>
  */
  SYSTEM_PHASENAME: string,

  /** string-based
      */
  SYSTEM_PLANID: string,

  /** If the pull request is from a fork of the repository, this variable is set to
          <code>True</code>.<br><br>Otherwise, it's set to <code>False</code>.
  */
  SYSTEM_PULLREQUEST_ISFORK: string,

  /** The ID of the pull request that caused this build. For example: <code>17</code>.
          (This variable is initialized only if the build ran because of a <a
            href="https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops#build-validation"
            data-linktype="relative-path">Git PR affected by a branch policy</a>).
  */
  SYSTEM_PULLREQUEST_PULLREQUESTID: string,

  /** The number of the pull request that caused this build. This variable is
          populated for pull requests from GitHub that have a different pull request ID and pull request number. This
          variable is only available in a YAML pipeline if the PR is affected by a branch policy.
  */
  SYSTEM_PULLREQUEST_PULLREQUESTNUMBER: string,

  /** The name of the target branch for a pull request. This variable can be used in a
          pipeline to conditionally execute tasks or steps based on the target branch of the pull request. For
          example, you might want to trigger a different set of tests or code analysis tools depending on the branch
          that the changes are being merged into.
  */
  SYSTEM_PULLREQUEST_TARGETBRANCHNAME: string,

  /** The branch that is being reviewed in a pull request. For example:
          <code>refs/heads/users/raisa/new-feature</code> for Azure Repos. (This variable is initialized only if the
          build ran because of a <a
            href="https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops#build-validation"
            data-linktype="relative-path">Git PR affected by a branch policy</a>). This variable is only available in
          a YAML pipeline if the PR is affected by a branch policy.
  */
  SYSTEM_PULLREQUEST_SOURCEBRANCH: string,

  /** The commit that is being reviewed in a pull request. (This variable is
          initialized only if the build ran because of a <a
            href="https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops#build-validation"
            data-linktype="relative-path">Git PR affected by a branch policy</a>). This variable is only available in
          a YAML pipeline if the PR is affected by a branch policy.
  */
  SYSTEM_PULLREQUEST_SOURCECOMMITID: string,

  /** The URL to the repo that contains the pull request. For example:
          <code>https://dev.azure.com/ouraccount/_git/OurProject</code>.
  */
  SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI: string,

  /** The branch that is the target of a pull request. For example:
          <code>refs/heads/main</code> when your repository is in Azure Repos and <code>main</code> when your
          repository is in GitHub. This variable is initialized only if the build ran because of a <a
            href="https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops#build-validation"
            data-linktype="relative-path">Git PR affected by a branch policy</a>. This variable is only available in a
          YAML pipeline if the PR is affected by a branch policy.
  */
  SYSTEM_PULLREQUEST_TARGETBRANCH: string,

  /** Set to 1 the first time this stage is attempted, and increments every time the
          job is retried.
  */
  SYSTEM_STAGEATTEMPT: string,

  /** The human-readable name given to a stage.
      */
  SYSTEM_STAGEDISPLAYNAME: string,

  /** string-based
          dependencies and accessing output variables.</td>
  */
  SYSTEM_STAGENAME: string,

  /** The URI of the TFS collection or Azure DevOps organization. For example:
          <code>https://dev.azure.com/fabrikamfiber/</code>.<br><br>This variable is agent-scoped, and can be used as
          an environment variable in a script and as a parameter in a build task, but not as part of the build number
          or as a version control tag.
  */
  SYSTEM_TEAMFOUNDATIONCOLLECTIONURI: string,

  /** The name of the project that contains this build.
      */
  SYSTEM_TEAMPROJECT: string,

  /** The ID of the project that this build belongs to.
      */
  SYSTEM_TEAMPROJECTID: string,

  /** string-based
          pipeline run.</td>
  */
  SYSTEM_TIMELINEID: string,

  /** Set to <code>True</code> if the script is being run by a build task.<br><br>This
          variable is agent-scoped, and can be used as an environment variable in a script and as a parameter in a
          build task, but not as part of the build number or as a version control tag.
  */
  TF_BUILD: string,
}


export interface ChecksVariables {
  /** Set to 1 the first time this stage is attempted, and increments every time the
          stage is retried.<br><br>This variable can only be used within an <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops"
            data-linktype="relative-path">approval or check</a> for an environment. For example, you could use
          <code>$(Checks.StageAttempt)</code> within an <a
            href="https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops#invoke-rest-api"
            data-linktype="relative-path">Invoke REST API check</a>.<br><br><span class="mx-imgBorder">
            <img src="media/checks-stageattempt-var.png?view=azure-devops" alt="Add the stage attempt as a parameter."
              data-linktype="relative-path">
          </span>

      */
  CHECKS_STAGEATTEMPT: string,
}


export const variablesMap = {
  'Agent.BuildDirectory': 'AGENT_BUILDDIRECTORY',
  'Agent.ContainerMapping': 'AGENT_CONTAINERMAPPING',
  'Agent.HomeDirectory': 'AGENT_HOMEDIRECTORY',
  'Agent.Id': 'AGENT_ID',
  'Agent.JobName': 'AGENT_JOBNAME',
  'Agent.JobStatus': 'AGENT_JOBSTATUS',
  'Agent.MachineName': 'AGENT_MACHINENAME',
  'Agent.Name': 'AGENT_NAME',
  'Agent.OS': 'AGENT_OS',
  'Agent.OSArchitecture': 'AGENT_OSARCHITECTURE',
  'Agent.TempDirectory': 'AGENT_TEMPDIRECTORY',
  'Agent.ToolsDirectory': 'AGENT_TOOLSDIRECTORY',
  'Agent.WorkFolder': 'AGENT_WORKFOLDER',
  'Build.ArtifactStagingDirectory': 'BUILD_ARTIFACTSTAGINGDIRECTORY',
  'Build.BuildId': 'BUILD_BUILDID',
  'Build.BuildNumber': 'BUILD_BUILDNUMBER',
  'Build.BuildUri': 'BUILD_BUILDURI',
  'Build.BinariesDirectory': 'BUILD_BINARIESDIRECTORY',
  'Build.ContainerId': 'BUILD_CONTAINERID',
  'Build.CronSchedule.DisplayName': 'BUILD_CRONSCHEDULE.DISPLAYNAME',
  'Build.DefinitionName': 'BUILD_DEFINITIONNAME',
  'Build.DefinitionVersion': 'BUILD_DEFINITIONVERSION',
  'Build.QueuedBy': 'BUILD_QUEUEDBY',
  'Build.QueuedById': 'BUILD_QUEUEDBYID',
  'Build.Reason': 'BUILD_REASON',
  'Build.Repository.Clean': 'BUILD_REPOSITORY.CLEAN',
  'Build.Repository.LocalPath': 'BUILD_REPOSITORY.LOCALPATH',
  'Build.Repository.ID': 'BUILD_REPOSITORY.ID',
  'Build.Repository.Name': 'BUILD_REPOSITORY.NAME',
  'Build.Repository.Provider': 'BUILD_REPOSITORY.PROVIDER',
  'Build.Repository.Tfvc.Workspace': 'BUILD_REPOSITORY.TFVC.WORKSPACE',
  'Build.Repository.Uri': 'BUILD_REPOSITORY.URI',
  'Build.RequestedFor': 'BUILD_REQUESTEDFOR',
  'Build.RequestedForEmail': 'BUILD_REQUESTEDFOREMAIL',
  'Build.RequestedForId': 'BUILD_REQUESTEDFORID',
  'Build.SourceBranch': 'BUILD_SOURCEBRANCH',
  'Build.SourceBranchName': 'BUILD_SOURCEBRANCHNAME',
  'Build.SourcesDirectory': 'BUILD_SOURCESDIRECTORY',
  'Build.SourceVersion': 'BUILD_SOURCEVERSION',
  'Build.SourceVersionMessage': 'BUILD_SOURCEVERSIONMESSAGE',
  'Build.StagingDirectory': 'BUILD_STAGINGDIRECTORY',
  'Build.Repository.Git.SubmoduleCheckout': 'BUILD_REPOSITORY.GIT.SUBMODULECHECKOUT',
  'Build.SourceTfvcShelveset': 'BUILD_SOURCETFVCSHELVESET',
  'Build.TriggeredBy.BuildId': 'BUILD_TRIGGEREDBY.BUILDID',
  'Build.TriggeredBy.DefinitionId': 'BUILD_TRIGGEREDBY.DEFINITIONID',
  'Build.TriggeredBy.DefinitionName': 'BUILD_TRIGGEREDBY.DEFINITIONNAME',
  'Build.TriggeredBy.BuildNumber': 'BUILD_TRIGGEREDBY.BUILDNUMBER',
  'Build.TriggeredBy.ProjectID': 'BUILD_TRIGGEREDBY.PROJECTID',
  'Common.TestResultsDirectory': 'COMMON.TESTRESULTSDIRECTORY',
  'Pipeline.Workspace': 'PIPELINE_WORKSPACE',
  'Environment.Name': 'ENVIRONMENT_NAME',
  'Environment.Id': 'ENVIRONMENT_ID',
  'Environment.ResourceName': 'ENVIRONMENT_RESOURCENAME',
  'Environment.ResourceId': 'ENVIRONMENT_RESOURCEID',
  'Strategy.Name': 'STRATEGY_NAME',
  'Strategy.CycleName': 'STRATEGY_CYCLENAME',
  'System.AccessToken': 'SYSTEM_ACCESSTOKEN',
  'System.CollectionId': 'SYSTEM_COLLECTIONID',
  'System.CollectionUri': 'SYSTEM_COLLECTIONURI',
  'System.DefaultWorkingDirectory': 'SYSTEM_DEFAULTWORKINGDIRECTORY',
  'System.DefinitionId': 'SYSTEM_DEFINITIONID',
  'System.HostType': 'SYSTEM_HOSTTYPE',
  'System.JobAttempt': 'SYSTEM_JOBATTEMPT',
  'System.JobDisplayName': 'SYSTEM_JOBDISPLAYNAME',
  'System.JobId': 'SYSTEM_JOBID',
  'System.JobName': 'SYSTEM_JOBNAME',
  'System.PhaseAttempt': 'SYSTEM_PHASEATTEMPT',
  'System.PhaseDisplayName': 'SYSTEM_PHASEDISPLAYNAME',
  'System.PhaseName': 'SYSTEM_PHASENAME',
  'System.PlanId': 'SYSTEM_PLANID',
  'System.PullRequest.IsFork': 'SYSTEM_PULLREQUEST_ISFORK',
  'System.PullRequest.PullRequestId': 'SYSTEM_PULLREQUEST_PULLREQUESTID',
  'System.PullRequest.PullRequestNumber': 'SYSTEM_PULLREQUEST_PULLREQUESTNUMBER',
  'System.PullRequest.targetBranchName': 'SYSTEM_PULLREQUEST_TARGETBRANCHNAME',
  'System.PullRequest.SourceBranch': 'SYSTEM_PULLREQUEST_SOURCEBRANCH',
  'System.PullRequest.SourceCommitId': 'SYSTEM_PULLREQUEST_SOURCECOMMITID',
  'System.PullRequest.SourceRepositoryURI': 'SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI',
  'System.PullRequest.TargetBranch': 'SYSTEM_PULLREQUEST_TARGETBRANCH',
  'System.StageAttempt': 'SYSTEM_STAGEATTEMPT',
  'System.StageDisplayName': 'SYSTEM_STAGEDISPLAYNAME',
  'System.StageName': 'SYSTEM_STAGENAME',
  'System.TeamFoundationCollectionUri': 'SYSTEM_TEAMFOUNDATIONCOLLECTIONURI',
  'System.TeamProject': 'SYSTEM_TEAMPROJECT',
  'System.TeamProjectId': 'SYSTEM_TEAMPROJECTID',
  'System.TimelineId': 'SYSTEM_TIMELINEID',
  'TF_BUILD': 'TF_BUILD',
  'Checks.StageAttempt': 'CHECKS_STAGEATTEMPT',
}
