/* @flow */
import * as fs from 'fs'
import * as path from 'path'

type PackageJson = {
  name: string,
  version?: string,
  description?: string,
  main?: string,
  scripts?: { [string]: string },
  dependencies?: { [string]: string },
  devDependencies?: { [string]: string }
}

export async function findNearestPackageJson(
  directoryPath: string = path.resolve()
): Promise<{ path: string, data: PackageJson }> {
  try {
    const packageJsonPath = path.join(directoryPath, 'package.json')
    const packageJsonData = JSON.parse(await readFile(packageJsonPath))
    return {
      path: packageJsonPath,
      data: packageJsonData
    }
  } catch (error) {
    const parentDirectoryPath = path.dirname(directoryPath)
    if (parentDirectoryPath === directoryPath) {
      throw new Error('No package.json files found')
    }
    return findNearestPackageJson(parentDirectoryPath)
  }
}

function readFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, result) => {
      if (error) reject(error)
      else resolve(result)
    })
  })
}

export function findNearestPackageJsonSync(
  directoryPath: string = path.resolve()
): { path: string, data: PackageJson } {
  try {
    const packageJsonPath = path.join(directoryPath, 'package.json')
    const packageJsonData = JSON.parse(readFileSync(packageJsonPath))
    return {
      path: packageJsonPath,
      data: packageJsonData
    }
  } catch (error) {
    const parentDirectoryPath = path.dirname(directoryPath)
    if (parentDirectoryPath === directoryPath) {
      throw new Error('No package.json files found')
    }
    return findNearestPackageJsonSync(parentDirectoryPath)
  }
}

function readFileSync(filePath: string): string {
  return fs.readFileSync(filePath, 'utf8')
}
