import { Module } from '@nestjs/common';

import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';

import { TypeORMModule } from 'src/database/typeorm/typeorm.module';
import { DomainManagerModule } from 'src/engine/core-modules/domain-manager/domain-manager.module';
import { FileUploadModule } from 'src/engine/core-modules/file/file-upload/file-upload.module';
import { FileModule } from 'src/engine/core-modules/file/file.module';
import { UserWorkspace } from 'src/engine/core-modules/user-workspace/user-workspace.entity';
import { UserWorkspaceResolver } from 'src/engine/core-modules/user-workspace/user-workspace.resolver';
import { UserWorkspaceService } from 'src/engine/core-modules/user-workspace/user-workspace.service';
import { User } from 'src/engine/core-modules/user/user.entity';
import { WorkspaceInvitationModule } from 'src/engine/core-modules/workspace-invitation/workspace-invitation.module';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import { DataSourceModule } from 'src/engine/metadata-modules/data-source/data-source.module';
import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import { UserRoleModule } from 'src/engine/metadata-modules/user-role/user-role.module';
import { TwentyORMModule } from 'src/engine/twenty-orm/twenty-orm.module';
import { WorkspaceDataSourceModule } from 'src/engine/workspace-datasource/workspace-datasource.module';
import { ApprovedAccessDomainModule } from 'src/engine/core-modules/approved-access-domain/approved-access-domain.module';
import { TokenModule } from 'src/engine/core-modules/auth/token/token.module';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature(
          [User, UserWorkspace, Workspace],
          'core',
        ),
        NestjsQueryTypeOrmModule.forFeature([ObjectMetadataEntity], 'core'),
        TypeORMModule,
        DataSourceModule,
        WorkspaceDataSourceModule,
        ApprovedAccessDomainModule,
        WorkspaceInvitationModule,
        DomainManagerModule,
        TwentyORMModule,
        UserRoleModule,
        FileUploadModule,
        FileModule,
        TokenModule,
      ],
      services: [UserWorkspaceService],
    }),
  ],
  exports: [UserWorkspaceService],
  providers: [UserWorkspaceService, UserWorkspaceResolver],
})
export class UserWorkspaceModule {}
