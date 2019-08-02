export default function RunFunctionalResult(target: any) {
  try{
    return Promise.resolve(target);
  } catch(e) {
    return Promise.reject(e);
  }
}